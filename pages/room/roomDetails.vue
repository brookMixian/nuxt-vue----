<template>
  <section class="details">
    <div class="detailsBox">
      <el-row class="details_top">
        <el-col :span="18" class="top_left">
          <el-col :span="24" class="information_max">{{basicInformationObj.postTitle}}</el-col>
          <el-col :span="24" class="item pd_top_10">
            <span class="information_sm">{{basicInformationObj.nickName}}</span>
            <span class="date">{{timeConversion(basicInformationObj.createTime)}}</span>
            <span><img src="~assets/praise.png" alt="">{{basicInformationObj.userLikeCount}}</span>
            <span><img src="~assets/message.png" alt="">{{basicInformationObj.userCommentCount}}</span>
            <span><img src="~assets/browse.png" alt="">{{basicInformationObj.userViewCount}}</span>
          </el-col>
        </el-col>
        <el-col :span="6" class="top_right">
          <el-col :span="10" class="tx_box">
            <div class="tx"><img :src="basicInformationObj.portrait" alt=""></div>
          </el-col>
          <el-col :span="14" class="tx_box">
            <div class="gz">
              <el-col :span="24">{{basicInformationObj.nickName}}</el-col>
              <el-col :span="24" class="pd_top_20">
                <span class="information_xs"><i>{{basicInformationObj.collectCount}}</i>&nbsp;收藏</span>
                <span class="text_xx gz_btn" style="margin-left: 10px" @click="collectionToggle()">{{collectionJudge(basicInformationObj.collectFlag)}}</span>
              </el-col>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="pd_top_20">
          <div v-html="basicInformationObj.postContext"></div>
        </el-col>
        <el-col :span="24" class="pd_50">
          <div class="give" @click="giveLike(basicInformationObj.userLikeFlag)">
            <div class="give_t">
              <img src="~assets/praise_ax.svg" alt="" v-if="basicInformationObj.userLikeFlag">
              <img src="~assets/praise_not.svg" alt="" v-else>
              <span>{{basicInformationObj.userLikeCount}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row id="partition">
      <el-col :span="24" class="partition">
      </el-col>
    </el-row>
    <div class="detailsBox" id="boss">
      <el-row class="leaveBox">
        <el-col :span="24" class="information_sm leave" v-if="userId">
          <el-input placeholder="请输入你的留言"
                    :autofocus="autofocus"
                    v-model="leave"
                    id="leave"
                    type="textarea" autosize></el-input>
        </el-col>
        <el-col :span="24" class="information_sm prompt" v-else>
          您尚未登录，请&nbsp;<a @click="viewJump()">登录</a>&nbsp;<!--或者&nbsp;<a>注册</a>&nbsp;-->量化社区发表回复。
        </el-col>
        <el-col :span="24" class="comments" v-if="userId">
          <el-button type="primary" :disabled="commentsStatus" @click="sumbitComments()">评论</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-for="(item,i) in aboutObj.data" class="aboutBox" :key="i">
          <v-about :aboutObj="item" @reply="reply($event)" :postCommentId="postCommentId"></v-about>
        </el-col>
        <el-col :span="24" class="pd_50">
          <el-pagination
            @current-change="handleCurrentChange($event)"
            :current-page.sync="pageInfo.pageIndex"
            :page-size="pageInfo.pageSize"
            layout="prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <v-homeBtm style="height: 400px"></v-homeBtm>
      </el-col>
    </el-row>


  </section>

</template>

<script>
  import {api} from '../../plugins/http/axios'
  import {tools} from '../../plugins/common'
  import about from '~/components/talkAbout.vue'
  import homeBtm from '~/components/homeBtm.vue'

  export default {
    data() {
      return {
        pageInfo: {
          pageIndex: 1,
          pageSize: 5,
          total: 1
        },
        autofocus: false,
        authorUserId: null,
        userId: null,
        postId: '',
        parentUserId: null,
        postCommentId: '',
        leave: '',
        commentsStatus: true,
        aboutObj: {
          data: []
        },
        basicInformationObj: {
          postTitle: '理性看待投资热潮',
          nickName: 'brook',
          createTime: '2018-1-8',
          userLikeCount: '200',
          userCommentCount: '200',
          userViewCount: '200',
          collectCount: '345',
          portrait: '',
          collectFlag: false,
          postContext: '',
          userLikeFlag: false
        }
      }
    },
    components: {
      'v-about': about,
      'v-homeBtm': homeBtm
    },
    methods: {
      getPostdetails() {
        // 帖子详情
        let url = '/post/show-post';
        let data = {
          postId: this.postId,
          userId: window.sessionStorage.getItem('userId')
        }
        api.postingDetails(url, data).then((res) => {
          if (res.data.success) {
            this.basicInformationObj = res.data.data
            this.authorUserId = res.data.data.userId;// 帖子作者id
            if(this.basicInformationObj.userLikeFlag){
              this.thumbState=true;
            }
            console.log(this.authorUserId, '作者id')
          }
          console.log(res, '帖子详情成功')
        }).catch((err) => {

        })
      },
      getPostcomment() {
        let url = '/postComment/post-comment-list?postId=' + this.postId;
        let data = {
          pageIndex: this.pageInfo.pageIndex,
          pageSize: this.pageInfo.pageSize
        }
        api.postingComment(url, data).then((res) => {
          if (res.data.success) {
            this.aboutObj.data = res.data.data.dataList;
            this.pageInfo.total = res.data.data.pageInfo.rowCount;
            console.log(res, '评论列表成功')
          }
        }).catch((err) => {

        })
      },
      getRelease() {
        // 评论接口
        let url = '/postComment/add-comment?token=' + window.sessionStorage.getItem('token');
        let data = {
          content: this.leave,
          parentUserId: this.parentUserId,
          postId: this.postId
        };
        api.releaseComments(url, data).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '评论成功',
              duration: 500,
              onClose: (() => {
                this.parentUserId = null;
                this.leave = null;
                this.getPostcomment();
              })
            })
          }
        }).catch((err) => {

        })
      },
      getGiveLike() {
        // 点赞接口
        let url = '/post/user-like?postId=' + this.postId + '&token=' + window.sessionStorage.getItem('token');
        api.giveLike(url).then((res) => {
          if (res.data.success) {
            this.getPostdetails();
          }
          console.log(res, '帖子详情成功')
        }).catch((err) => {

        })
      },
      getDelGiveLike() {
        // 取消点赞接口
        let url = '/post/del-user-like?postId=' + this.postId + '&token=' + window.sessionStorage.getItem('token');
        api.delGiveLike(url).then((res) => {
          if (res.data.success) {
            this.getPostdetails();
          }
          console.log(res, '帖子详情成功')
        }).catch((err) => {

        })

      },
      getAddCollection() {
        // 收藏接口
        let url = '/collect/add-collect?token=' + window.sessionStorage.getItem('token');
        let data = {
          postId: this.postId,
          postUserId: this.authorUserId
        }
        api.addCollection(url, data).then((res) => {
          if (res.data.success) {
            console.log(res, '收藏成功')
            this.getPostdetails();
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 1000
            })
          }
        }).catch((err) => {

        })
      },
      timeConversion(time) {
        return tools.dateFormate(new Date(time), 'yyyy-MM-dd')
      },
      collectionJudge(status) {
        if (status) {
          return '已收藏'
        } else {
          return '收藏'
        }
      },
      handleCurrentChange(e) {
        // 页码切换
        this.pageInfo.pageIndex = e;
        this.getPostcomment();
      },
      viewJump(){
        this.$router.push({
          path: '/loginToregister/login'
        })
      },
      reply(e) {
        // 回复
        let userId = window.sessionStorage.getItem('userId');
        if (userId) {
          tools.scrollTo('partition', null)
          this.parentUserId = e.uid;
          this.autofocus = true;
          this.leave = '@' + e.nickName;
        } else {
          this.$message({
            type: 'info',
            message: '请先登入',
            duration: 1000,
            onClose: (() => {
              this.$router.push({
                path: '/loginToregister/login'
              })
            })
          })

        }

      },
      giveLike(status) {
        // 点赞
        let userId = window.sessionStorage.getItem('userId');
        if (userId) {
          if (status) {
            this.getDelGiveLike();
          } else {
            this.getGiveLike();
          }
        } else {
          this.$message({
            type: 'info',
            message: '请先登入',
            duration: 1000,
            onClose: (() => {
              this.$router.push({
                path: '/loginToregister/login'
              })
            })
          })
        }


      },
      collectionToggle() {
        //收藏
        let userId = window.sessionStorage.getItem('userId');
        // console.log(typeof userId, typeof this.authorUserId, '帖子id啊啊啊啊')
        if (userId) {
          if (userId == this.authorUserId) {
            this.$message({
              type: 'info',
              message: '这已经是您的帖子',
              duration: 1000
            })
          } else {
            this.getAddCollection();

          }
        } else {
          this.$message({
            type: 'info',
            message: '请先登入',
            duration: 1000,
            onClose: (() => {
              this.$router.push({
                path: '/loginToregister/login'
              })
            })
          })
        }

      },
      sumbitComments() {
        // 评论
        this.getRelease();
      }
    },
    created() {
      this.postId = this.$route.query.postId;
      this.postCommentId = 'a' + this.$route.query.postCommentId;
      console.log(this.postCommentId, '回复内容id')
    },
    mounted() {
      this.userId = window.sessionStorage.getItem('userId');
      this.getPostdetails();
      this.getPostcomment();
      // this.$nextTick(() => {
      //   this.scroolTo();
      // })

    },
    watch: {
      postId(v) {
        console.log(v, '帖子id')
      },
      leave(v) {
        if (v) {
          this.commentsStatus = false;
        } else {
          this.commentsStatus = true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    padding-top: 20px;
    width: 100%;
  }

  .detailsBox {
    width: 90%;
    margin: 0 auto;
  }

  .date {
    color: #9c9c9c;
    font-size: 14px;
  }

  .partition {
    background: #f4f4f4;
    height: 20px;
  }

  .prompt {
    text-align: center;
    a {
      color: #4a90e2;
      cursor: pointer;
    }
  }

  .details_top {
    border-bottom: 1px solid #d3d3d3;
    border-top: 1px solid #d3d3d3;
  }

  .leaveBox {
    border-bottom: 2px solid #f4f4f4;
  }

  .leave {
    padding-top: 50px;
    border-bottom: 2px #f4f4f4 solid;
  }

  .comments {
    text-align: right;
    padding: 10px 0 20px;
  }

  .top_left {
    padding: 20px 0;
  }

  .top_right {
    height: 102px;
    border-left: 1px solid #d3d3d3;
    .tx_box {
      height: 102px;
      position: relative;
      i {
        color: #40A7D5;
      }
    }
    .gz {
      width: 100%;
      height: 66px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      .gz_btn {
        padding: 2px 4px;
        border-radius: 2px;
        text-align: center;
        cursor: pointer;
        background: #4a90e2;
      }
    }
    .tx {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #D8D8D8;
      img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
      }
    }
  }

  .item {
    .information_sm {
      margin-left: 0;
    }
    span {
      margin: 0 10px;
    }
    img {
      width: 20px;
      display: inline-block;
      vertical-align: text-bottom;
    }
  }

  .give {
    margin: 0 auto;
    width: 120px;
    cursor: pointer;
    text-align: center;
    height: 70px;
    position: relative;
    background: linear-gradient(-90deg, #3A71AB 0%, #488ECB 48%, #3FA8D5 100%);
    /*background: url("../../assets/praise_not.svg") no-repeat;*/
    border-radius: 100px;
    .give_t {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      margin: auto;
      img {
        margin-top: 10px;
      }
      span {
        display: block;
        color: #fff;
      }
    }
  }

  .aboutBox {
    border-bottom: 2px #f4f4f4 solid;
  }


</style>
