<template>
  <section class="container">
    <el-row>
      <el-col :span="24" class="homeHeader"><img src="~assets/banner.svg" alt=""></el-col>
    </el-row>
    <el-row class="school">
      <el-col :span="12" class="text-right school_left">
        <!--<img src="~assets/tx.jpg" alt="">-->
        <div class="picture_left">
          <img src="~assets/home_data.svg" style="display:block;width:50px;height:50px">
          <span>数据</span>
        </div>
      </el-col>
      <el-col :span="12" class="text-right school_right">
        <!--<img src="~assets/tx.jpg" alt="">-->
        <div class="picture_right">
          <img src="~assets/home_school.svg" style="display:block;width:50px;height:50px">
          <span>学堂</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="default">
      <el-col :span="24" class="pd_50 text-center information_lg">大家都在看</el-col>
      <div class="home_box">
        <el-col :span="8" class="home_content" v-for="(item,i) in bbsObj.list" :key="item.id">
          <v-bbs :bbsObj="item" @viewsDetails="viewsDetails($event)"></v-bbs>
        </el-col>
      </div>
    </el-row>
    <v-homeBtm class="home">
      <el-row>
        <el-col :span="24" class="pd_50 text-center information_lg">合作伙伴</el-col>
        <el-col :span="24">
          <div class="btn_img">
            <div><img src="~assets/htzj.svg" alt=""></div>
            <div><img src="~assets/hczj.svg" alt=""></div>
            <div>
              <img src="~assets/kyzj.svg" alt="">
            </div>
            <div>
              <img src="~assets/hazj.svg" alt="">
            </div>
            <div>
              <img src="~assets/dbzj.svg" alt="">
            </div>
            <div>
              <img src="~assets/dfcf.svg" alt="">
            </div>
          </div>
        </el-col>
        <el-col :span="24"></el-col>
      </el-row>
    </v-homeBtm>
  </section>
</template>

<script>
  import bbs from '~/components/bbsConent.vue'
  import homeBtm from '~/components/homeBtm.vue'
  import {api} from '../plugins/http/axios'
  import {mapMutations} from 'vuex'

  export default {
    components: {
      'v-bbs': bbs,
      'v-homeBtm': homeBtm
    },
    head() {
      return {
        title: '首页'
      }
    },
    asyncData() {
      return {}
    },
    data() {
      return {
        img: {
          url1: '~assets/home_data.svg'
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
        }
      }
    },
    methods: {
      getDefaultLoad() {
        api.home().then((res) => {
          if (res.data.success) {
            this.bbsObj.list = res.data.data;
            console.log(res, '首页加载成功')
          }
        })
      },
      getMessagePrompt() {
        let userId=window.sessionStorage.getItem('userId');
        if(userId){
          api.messagePrompt().then((res) => {
            if (res.data.success) {
              this.setMessagePrompt(res.data.data)
            }
          }).catch((err) => {
            console.log(err, '列表')
          })
        }
      },
      viewsDetails(id) {
        this.$router.push({
          path: "/room/roomDetails",
          query: {
            postId: id
          }
        })
      },
      ...mapMutations([
        'setMessagePrompt'
      ])
    },
    mounted() {
      let _this = this;
      setInterval(() => {
        _this.getMessagePrompt();
      }, 4000)
      this.getDefaultLoad();
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100vh;
  }

  .school {
    display: none;
  }

  .homeHeader {
    height: auto;
    overflow: hidden;
    img {
      float: left;
      width: 100%;
    }
  }

  .default {
    background: rgb(249, 249, 249);
  }

  .information_lg {
    color: #222e44;
    font-size: 24px;
    font-weight: bold;
  }

  .school_left {
    position: relative;
    height: 100px;
    margin-bottom: 20px;
    .picture_left {
      position: absolute;
      right: 100px;
      top: 50px;
      text-align: center;
      margin: -25px 0;
      font-size: 14px;
      color: #404040;
      cursor: pointer;
      span {
        position: relative;
        top: 10px;
      }
    }
  }

  .school_right {
    position: relative;
    height: 100px;
    margin-bottom: 20px;
    .picture_right {
      position: absolute;
      left: 100px;
      text-align: center;
      top: 50px;
      cursor: pointer;
      font-size: 14px;
      color: #404040;
      margin: -25px 0;
      span {
        position: relative;
        top: 10px;
      }
    }
  }

  .home_box {
    width: 80%;
    margin: 0 auto;
  }

  .home_content {
    padding: 20px 10px;
    .item {
      cursor: pointer;
      background: #FFFFFF;
      padding: 34px;
      box-shadow: 0 4px 12px 0 #D2E1ED;
      border-radius: 10px;
      height: 240px;
      .item_title {
      }
      .item_content {
      }
    }
  }

  .home {
    height: 700px;
  }

  .btn_img {
    width: 70%;
    margin: 0 auto;
    padding-top: 40px;
    height: 100px;
    overflow: hidden;
    div {
      float: left;
      width: 16.6666%;
      padding: 0 10px;
      img {
        width: 100%;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        /*margin-left: 25px;*/
      }
    }
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
