<template>
  <section class="room">
    <el-row>
      <el-col :span="24" class="roomHeader"><img src="~assets/roomBanner.svg" alt=""></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ul class="room_ul" ref="room_ul">
          <li v-for="(item,i) in directoryObj.list" :style="{width:liWidth}">
            <a :class="{active:i===directoryObj.status}" @click="toggle(i,item.menuId)">{{item.menuName}}</a>
          </li>
          <div class="clear">
          </div>
        </ul>
      </el-col>
    </el-row>
    <el-row class="default">
      <div class="room_box">
        <el-col :span="8" v-for="(item,i) in bbsObj.list" :key="item.id" class="room_content">
          <v-bbs :bbsObj="item" @viewsDetails="viewsDetails($event)"></v-bbs>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="room_box text-center">
        <el-pagination
          @current-change="handleCurrentChange($event)"
          :current-page.sync="contentObj.pageIndex"
          :page-size="contentObj.pageSize"
          layout="prev, pager, next, jumper"
          :total="contentObj.total">
        </el-pagination>

      </div>
    </el-row>
    <v-homeBtm class="homeBtm"></v-homeBtm>
  </section>

</template>

<script>
  import bbs from '~/components/bbsConent.vue'
  import homeBtm from '~/components/homeBtm.vue'
  import {api} from '../../plugins/http/axios'

  export default {
    components: {
      'v-bbs': bbs,
      'v-homeBtm': homeBtm
    },
    asyncData() {
      let data = {}
      return api.qryPostList(data).then((res) => {
      }).catch(() => {

      })

    },
    data() {
      return {
        liWidth: '20%',
        currentPage3: 3,
        directoryObj: {
          status: 0,
          list: [
            {
              menuName: '',
              status: true,
              menuId: '0'
            }
          ]
        },
        bbsObj: {
          list: [
            {
              postTitle: '这是头部',
              postSummary: '这是简介',
              nickName: 'brook',
              userLikeCount: '333',
              postCommentCount: '21',
              viewCount: '212',
              id: '0'
            }
          ]
        },
        contentObj: {
          pageIndex: 1,
          pageSize: 6,
          menuId: 1,
          total: 10
        }
      }
    },
    head() {
      return {
        title: '量化学堂',
        meta: [
          {hid: 'description', name: 'description', content: 'My custom description'}
        ]
      }
    },
    methods: {
      getMenuList() {
        api.menuList().then((res) => {
          if (res.data.success) {
            let list = [
              {
                menuName: '新手专区',
                status: true,
                menuId: '0'
              },
              {
                menuName: 'python编程',
                status: false,
                menuId: '1'
              },
              {
                menuName: '策略与应用',
                status: false,
                menuId: '2'
              }
            ];
            this.directoryObj.list = res.data.data.length > 0 ? res.data.data : list;// 防止数据库没数据页面不显示
            // let ulWidth = $('.room_ul').width();
            let liWidth = 100 / this.directoryObj.list.length;
            this.liWidth = liWidth + '%';// 动态计算子目录长度
          }

        }).catch((err) => {

        })

      },
      getPostList() {
        let url = '/post/qry-post-list';
        let data = {
          menuId: this.contentObj.menuId,
          pageInfo: {
            pageIndex: this.contentObj.pageIndex,
            pageSize: this.contentObj.pageSize
          },
          postTitle: null,
          status: '0'
        };
        api.qryPostList(url, data).then((res) => {
          console.log(res, '帖子列表')
          this.contentObj.total = res.data.data.pageInfo.rowCount;
          this.bbsObj.list = res.data.data.dataList;
          // console.log(res, '哈哈哈')
        }).catch((err) => {
          console.log(err, '错误')

        })
      },
      toggle(index, id) {
        this.contentObj.menuId = id;
        this.directoryObj.status = index;
        this.getPostList();
      },
      viewsDetails(id) {
        this.$router.push({
          path: "/room/roomDetails",
          query: {
            postId: id
          }
        })
      },
      handleCurrentChange(e) {
        this.contentObj.pageIndex = e;
        this.getPostList();

        console.log(e)
      }
    },
    mounted() {
      this.getMenuList();
      this.getPostList();
    }
  }
</script>

<style lang="scss" scoped>
  .homeBtm {
    height: 450px;
  }

  .roomHeader {
    width: 100%;
    overflow: hidden;
    img {
      float: left;
      width: 100%;
    }
  }

  .room_ul {
    width: 60%;
    margin: 0 auto;
    li {
      float: left;
      a {
        display: inline-block;
        width: 100%;
        margin: 0 auto;
        cursor: pointer;
        text-align: center;
        line-height: 70px;
        transition: .5s ease all;
        border-bottom: 3px solid #fff;
        &.active {
          color: #2678e4;
          border-bottom: 3px solid #2678e4;
        }
      }
    }
  }

  .default {
    background: rgb(249, 249, 249);
  }

  .room_box {
    width: 80%;
    margin: 20px auto 0;
    .room_content {
      padding: 20px 10px;
    }
  }

</style>
