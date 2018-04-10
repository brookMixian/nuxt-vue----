<template>
  <section class="personalAccount">
    <el-row class="account">
      <el-col :span="6">
        <v-nav :navList="navList" @toggle="toggle($event)"></v-nav>
      </el-col>
      <el-col :span="18" class="account_right scroll">
        <el-col :span="24" class="tagBox" v-if="message.type">
          <button class="btn tag" @click="tagMessageAll()">全部标记为已读</button>
        </el-col>
        <v-sw :swList="community.list" :status="community.status" @tab="tab($event)" v-if="community.type"></v-sw>
        <v-sw :swList="message.list" :status="message.status" v-if="message.type" @tab="messaeTab($event)"></v-sw>
        <v-sw :swList="settingsObj.list" :status="settingsObj.status" v-if="settingsObj.type"
              @tab="settingsTab($event)"></v-sw>
        <v-homePage
          v-if="homePageType"
          @update="handleAvatarSuccess($event)"
          @comfirmAction="comfirmAction"
          @modfiyNick="modfiyNick"
          :homePageList="homePage"
          :imageUrl="upLoad.imageUrl"></v-homePage>
        <v-message :messageList="message.data"
                   @messageHandleCurrentChange="messageHandleCurrentChange($event)"
                   :messagePageInfo="message.pageInfo"
                   @viewMessage="viewMessage($event)"
                   v-if="message.type"></v-message>

        <v-setUp :settingsObj="settingsObj" v-if="settingsObj.type&&settingsObj.status===0" @save="save()"></v-setUp>
        <!--<v-personalInfor :settingsObj="settingsObj" v-if="settingsObj.type&&settingsObj.status===1"></v-personalInfor>-->
        <v-edit :settingsObj="settingsObj" v-if="settingsObj.type&&settingsObj.status===1" @update="update()"></v-edit>
        <v-themeContent
          :contentObj="contentObj.themeList"
          :themePage="themePageObj"
          @viewPost="viewPost($event)"
          @themeHandleCurrentChange="themeHandleCurrentChange($event)"
          v-if="community.type&&community.status===0"></v-themeContent>
        <v-replyContent :contentObj="contentObj.replyList"
                        @viewReply="viewReply($event)"
                        @replyHandleCurrentChange="replyHandleCurrentChange($event)"
                        :replyPage="replyPageObj"
                        v-if="community.type&&community.status===1"></v-replyContent>
        <v-collectionContent :contentObj="contentObj.collectionList"
                             @collectionHandleCurrentChange="collectionHandleCurrentChange($event)"
                             @viewPost="viewPost($event)"
                             :collectionPage="collectionPageObj"
                             v-if="community.type&&community.status===2"></v-collectionContent>
        <v-historyContent :contentObj="contentObj.historyList"
                          @viewPost="viewPost($event)"
                          v-if="community.type&&community.status===3"></v-historyContent>
      </el-col>
    </el-row>
  </section>

</template>

<script>
  import Nav from '~/components/navigation.vue'
  import sw from '~/components/switch.vue'
  import homePage from '~/components/accountHomePage.vue'
  import replyContent from '~/components/replyContent.vue'
  import themeContent from '~/components/themeContent.vue'
  import collectionContent from '~/components/collectionContent.vue'
  import historyContent from '~/components/historyContent.vue'
  import messageList from '~/components/messageList.vue'
  import setUp from '~/components/accountSettings.vue'
  import editPass from '~/components/editorPass.vue'
  import {api} from '../../plugins/http/axios'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        routeStatus: '',
        contentObj: {
          replyList: [
            {
              createTimeStr: '',
              postName: '',
              content: '',
              postCommentId: ''
            }
          ],
          themeList: [
            {
              createTimeStr: null,
              postContext: null
            }
          ],
          collectionList: [
            {
              createTimeStr: '',
              postTitle: ''
            }
          ],
          historyList: [
            {
              createTimeStr: '',
              postTitle: ''
            }
          ]
        },
        themePageObj: {
          currentPage: 1,
          pageSize: 5,
          total: null
        },
        replyPageObj: {
          currentPage: 1,
          pageSize: 5,
          total: 1
        },
        collectionPageObj: {
          currentPage: 1,
          pageSize: 5,
          total: 1
        },
        upLoad: {
          imageUrl: '',
          interfaceUrl: "http://192.168.152.132:8088/tfs-forums/user/mod-userPortrait",
          upLoadData: {
            token: '',
            myfiles: ""
          }
        },
        homePage: {
          len: 20,
          nickName: '',
          collectCount: 0,
          userCollectCount: 0,
          loginCountLast: 0,
          loginCountNow: 0,
          userPortrait: null
        },
        homePageType: true,
        settingsObj: {
          list: [
            {
              name: '账户设置',
              key: 'set'
            },
            {
              name: '登入密码',
              key: 'pas'
            }
          ],
          status: 0,
          type: false,
          mobile: '',
          nickName: '',
          introduction: '',
          currentPass: '',
          newPass: '',
          confirmPass: '',
          professional: '',
          schooling: '',
          email: '',
          address: '',
          nick: false
        },
        navList: [
          {
            main: '我的账户',
            key: '0',
            status: true,
            timeList: [
              {
                menuName: '账户主页',
                key: 'account',
                status: true
              },
              {
                menuName: '消息中心',
                key: 'center',
                status: false
              }
            ]
          },
          {
            main: '设置',
            status: false,
            key: '1',
            timeList: [
              {
                menuName: '账户设置',
                key: 'setUp',
                status: false
              },
              {
                menuName: '登入密码',
                key: 'pass',
                status: false
              }
            ]
          },
          {
            main: '社区',
            status: false,
            key: '2',
            timeList: [
              {
                menuName: '我的主题',
                key: 'theme',
                status: false
              },
              {
                menuName: '我的回复',
                key: 'reply',
                status: false
              },
              {
                menuName: '我的收藏',
                key: 'collection',
                status: false
              },
              {
                menuName: '浏览记录',
                key: 'record',
                status: false
              }
            ]
          }
        ],
        message: {
          status: 0,
          type: false,
          list: [
            {
              name: '@我的',
              key: '1'
            },
            {
              name: '评论',
              key: '2'
            }
          ],
          data: [],
          postCommentId: [],
          pageInfo: {
            pageIndex: 1,
            pageSize: 5,
            total: 1
          }
        },
        community: {
          type: false,
          status: 0,
          list: [
            {
              name: '主题',
              key: '1'
            },
            {
              name: '回复',
              key: '2'
            },
            {
              name: '收藏',
              key: '3'
            },
            {
              name: '浏览记录',
              key: '4'
            }
          ]
        },
        files: ''
      }
    },
    head() {
      return {
        title: '个人中心'
      }
    },
    methods: {
      getUser() {
        // 用户中心 -主页
        let token = {
          token: window.sessionStorage.getItem('token')
        }
        api.user(token).then((res) => {
          if (res.data.success) {
            // console.log()
            this.homePage = res.data.data;
            this.setNickname(res.data.data.nickName)  // vuex传值
            this.settingsObj.mobile = res.data.data.mobile;
            this.settingsObj.nickName = res.data.data.nickName;
            console.log(res.data.data, '主页数据')
            this.calculate(this.homePage);
          }
        })
      },
      getMessageCenter() {
        // @我的消息
        let data = {
          pageIndex: this.message.pageInfo.pageIndex,
          pageSize: this.message.pageInfo.pageSize,
        };
        api.messageCenter(data).then((res) => {
          if (res.data.success) {
            this.message.data = res.data.data.dataList;
            this.message.pageInfo.total = res.data.data.pageInfo.rowCount;
            console.log(res, '消息中心成功')
          }
        }).catch((err) => {
          console.log(err, '消息中心失败')
        })
      },
      getCommentsMessage() {
        //  评论我的
        let data = {
          pageIndex: this.message.pageInfo.pageIndex,
          pageSize: this.message.pageInfo.pageSize,
        };
        api.commentsMessage(data).then((res) => {
          if (res.data.success) {
            this.message.data = res.data.data.dataList;
            this.message.pageInfo.total = res.data.data.pageInfo.rowCount;
            console.log(res, '评论我的')
          }
        }).catch((err) => {
          console.log(err, '消息中心失败')
        })
      },
      getMyThem() {
        // 我的主题
        let data = {
          pageIndex: this.themePageObj.currentPage,
          pageSize: this.themePageObj.pageSize,
        };
        api.myTheme(data).then((res) => {
          if (res.data.success) {
            console.log('我的主题', res)
            this.contentObj.themeList = res.data.data.dataList;
            this.themePageObj.total = res.data.data.pageInfo.rowCount;
          }

        }).catch((err) => {

        })
      },
      getMyReply() {
        // 我的回复
        let data = {
          pageIndex: this.replyPageObj.currentPage,
          pageSize: this.replyPageObj.pageSize,
        }
        api.myReply(data).then((res) => {
          if (res.data.success) {
            console.log(res, '我的回复')
            this.contentObj.replyList = res.data.data.dataList;
            this.replyPageObj.total = res.data.data.pageInfo.rowCount;
          }
        }).catch((err) => {

        })
      },
      getMyCollection() {
        // 我的收藏
        let data = {
          pageIndex: this.collectionPageObj.currentPage,
          pageSize: this.collectionPageObj.pageSize
        }
        api.myCollection(data).then((res) => {
          if (res.data.success) {
            this.contentObj.collectionList = res.data.data.dataList;
            this.collectionPageObj.total = res.data.data.pageInfo.rowCount;
            console.log(res, '我的收藏')
            // this.contentObj.collectionList = res.data.data;
          }

        }).catch((err) => {

        })
      },
      getHistory() {
        // 浏览记录
        let data = {
          pageIndex: 1,
          pageSize: 5,
        }
        api.history(data).then((res) => {
          if (res.data.success) {
            this.contentObj.historyList = res.data.data;
            console.log(res, '浏览记录成功')
          }

        }).catch((err) => {

        })
      },
      getViewMessage(postCommentId) {
        // 查看消息
        this.message.postCommentId.push(postCommentId)
        let url = '/postComment/mod-isRead?postCommentIds=' + this.message.postCommentId;
        api.viewMessage(url).then((res) => {
          if (res.data.success) {
            this.getMessageCenter();
          }

        }).catch((err) => {

        })
      },
      messageHandleCurrentChange(e) {
        this.message.pageInfo.pageIndex = e;
        this.getMessageCenter();
      },
      themeHandleCurrentChange(e) {
        // 我的主题 页码切换
        this.themePageObj.currentPage = e;
        this.getMyThem();

      },
      replyHandleCurrentChange(e) {
        // 我的回复
        this.replyPageObj.currentPage = e;
        this.getMyReply();
      },
      collectionHandleCurrentChange(e) {
        // 我的收藏
        this.collectionPageObj.currentPage = e;
        this.getMyCollection();
      },
      tagMessageAll() {
        if (this.message.data.length > 0) {
          this.message.data.map((item) => {
            this.message.postCommentId.push(item.postCommentId)
          })
          this.getViewMessage(this.message.postCommentId)
        } else {
          this.$message({
            type: 'info',
            message: '暂无最新消息',
            duration: 1000
          })
        }
      },
      viewPost(id) {
        this.$router.push({
          path: '/room/roomDetails',
          query: {
            postId: id
          }
        })
      },
      viewReply(e) {
        this.$router.push({
          path: '/room/roomDetails',
          query: {
            postId: e.postId,
            postCommentId: e.postCommentId
          }
        })
      },
      viewMessage(e) {
        this.$router.push({
          path: '/room/roomDetails',
          query: {
            postId: e.postId,
            postCommentId: e.postCommentId
          }
        })
        this.getViewMessage(e.postCommentId)

      },
      toggle(e) {
        switch (e.str.key) {
          case 'account': {
            // 账户主页
            this.routeStatus = 'account';
            break
          }
          case 'center': {
            // 消息中心
            this.routeStatus = 'center';
            break
          }
          case 'setUp': {
            // 账户设置
            this.routeStatus = 'setUp';
            break
          }
          case 'pass': {
            // 登入密码
            this.routeStatus = 'pass';
            break
          }
          case 'theme': {
            //  我的主题
            this.routeStatus = 'theme';

            break
          }
          case 'reply': {
            this.routeStatus = 'reply';
            //  我的回复
            break
          }
          case 'collection': {
            //  我的收藏
            this.routeStatus = 'collection';
            break
          }
          case 'record': {
            //  浏览记录
            this.routeStatus = 'record';
            break
          }
        }
      },
      tab(index) {
        this.community.status = index;
        switch (index) {
          case 0: {
            this.getMyThem();
            break
          }
          case 1: {
            this.getMyReply();
            break
          }
          case 2: {
            this.getMyCollection();
            break
          }
          case 3: {
            this.getHistory();
            break
          }
        }
      },
      messaeTab(index) {
        this.message.status = index;
        switch (index) {
          case 0: {
            this.getMessageCenter();
            break
          }
          case 1: {
            this.getCommentsMessage();
            break
          }
          case 2: {
            break
          }
        }
      },
      settingsTab(index) {
        // 账户设置
        this.settingsObj.status = index;
        switch (index) {
          case 0: {
            break
          }
          case 1: {
            break
          }
        }
      },
      handleAvatarSuccess(file) {
        // 上传头像
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        this.files = file.target.files[0];
        let formData = new FormData();
        const isLt2M = this.files.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message({
            message: '上传头像图片大小不能超过 2MB',
            type: 'warning',
            duration: 2000
          });
          return
        }
        formData.append('multipartFile', this.files);
        api.upLoadHead(formData, config).then((res) => {
          if (res.data.success) {
            this.homePage.userPortrait = res.data.data;
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000,
              onClose: (() => {
                this.getUser();
              })
            });
          }
        }).catch((err) => {
        })
      },
      comfirmAction() {

      },
      calculate(home) {
        // 计算进度条的进度
        let t = home.loginCountLast / 30;
        let d = 100 * t;
        this.homePage.len = d;
        console.log(d, "ahhhha")
      },
      modfiyNick() {
        this.routeStatus = 'setUp'
        this.settingsObj.nick = true;
        this.settingsObj.type = true;
        this.settingsObj.status = 0;
        this.message.type = false;
        this.homePage.type = false;
        this.community.type = false;
      },
      save() {
        // 账户设置保存
        if (this.settingsObj.nickName) {
          let data = {
            mobile: this.settingsObj.mobile,
            nickName: this.settingsObj.nickName,
            profession: this.settingsObj.professional,
            educationalBackground: this.settingsObj.schooling,
            email: this.settingsObj.email,
            connectAddress: this.settingsObj.address
          }
          api.accountSet(data).then((res) => {
            if (res.data.success) {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: (() => {
                  this.settingsObj.type = false;
                  this.settingsObj.status = false;
                  this.routeStatus = 'account'
                  this.getUser();
                })
              });
            }
          }).catch((err) => {
            console.log('账户设置保存失败', err)
          })
        } else {
          this.$message({
            type: "warning",
            message: "昵称不能为空",
            duration: 1000
          })
        }
      },
      update() {
        // 更新密码
        if (this.settingsObj.currentPass && this.settingsObj.newPass && this.settingsObj.confirmPass) {
          let pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
          if (!pass.test(this.settingsObj.newPass)) {
            this.$message({
              message: '请输入包含英文数字6位数及以上的新密码',
              type: 'warning',
              duration: 2000
            })
          } else if (this.settingsObj.confirmPass != this.settingsObj.newPass) {
            this.$message({
              message: '两次密码不一样',
              type: 'warning',
              duration: 1000
            })
          } else {
            let data = {
              oldPass: md5(this.settingsObj.currentPass),
              newPass: md5(this.settingsObj.newPass)
            }
            api.editPass(data).then((res) => {
              if (res.data.success) {
                console.log(res, '成功')
                this.$message({
                  message: res.data.message + '请重新登入',
                  type: 'success',
                  duration: 1000,
                  onClose: (() => {
                    window.sessionStorage.removeItem('userId');
                    this.setRoleNum(0);
                    this.setAccount(0);
                    this.$router.push({
                      path: '/loginToregister/login'
                    })
                  })
                })
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error',
                  duration: 2000
                })
              }
            }).catch((err) => {

            })
          }
        } else if (!this.settingsObj.currentPass) {
          this.$message({
            message: '请输入当前密码',
            type: 'warning',
            duration: 1000
          })
        } else if (!this.settingsObj.newPass) {
          this.$message({
            message: '请输入新密码',
            type: 'warning',
            duration: 1000
          })
        } else if (!this.settingsObj.confirmPass) {
          this.$message({
            message: '请确认新密码',
            type: 'warning',
            duration: 1000
          })
        }
      },
      ...mapMutations([
        'setNickname',
        'setRoleNum',
        'setAccount'
      ])
    },
    mounted() {
      this.getUser();
      this.upLoad.token = window.sessionStorage.getItem('token')
      console.log(this.routeStatus, "默认")
    },
    created() {
      this.routeStatus = this.$route.query.status;
      console.log(this.routeStatus, "传值")
    },
    activated() {
      this.routeStatus = this.$route.query.status;
      console.log(this.routeStatus, "看看")
    },
    watch: {
      'routeStatus'(v) {
        // 个人中心侧边栏切换
        switch (v) {
          case 'account': {
            this.navList.map((item) => {
              if (item.key === '0') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'account') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            })
            this.homePageType = true;
            this.settingsObj.nick = false;
            this.community.type = false;
            this.message.type = false;
            this.settingsObj.type = false;
            break
          }
          case 'center': {
            this.navList.map((item) => {
              if (item.key === '0') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'center') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.message.type = true;
            this.homePageType = false;
            this.settingsObj.nick = false;
            this.community.type = false;
            this.settingsObj.type = false;
            this.getMessageCenter();
            break
          }
          case 'setUp': {
            this.navList.map((item) => {
              if (item.key === '1') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'setUp') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            })
            this.settingsObj.type = true;
            this.settingsObj.status = 0;
            this.message.type = false;
            this.homePageType = false;
            this.homePage.routeStatus = true;
            this.settingsObj.nick = false;
            this.community.type = false;
            break
          }
          case 'pass': {
            this.navList.map((item) => {
              if (item.key === '1') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'pass') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.settingsObj.type = true;
            this.settingsObj.status = 1;
            this.message.type = false;
            this.settingsObj.nick = false;
            this.homePageType = false;
            this.community.type = false;
            break
          }
          case 'theme': {
            this.navList.map((item) => {
              if (item.key === '2') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'theme') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.homePageType = false;
            this.community.type = true;
            this.message.type = false;
            this.settingsObj.nick = false;
            this.settingsObj.type = false;
            this.community.status = 0;
            this.getMyThem();
            break
          }
          case 'reply': {
            this.navList.map((item) => {
              if (item.key === '2') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'reply') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.homePageType = false;
            this.community.type = true;
            this.settingsObj.type = false;
            this.settingsObj.nick = false;
            this.message.type = false;
            this.community.status = 1;
            this.getMyReply();
            break
          }
          case 'collection': {
            this.navList.map((item) => {
              if (item.key === '2') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'collection') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.homePageType = false;
            this.community.type = true;
            this.settingsObj.type = false;
            this.message.type = false;
            this.settingsObj.nick = false;
            this.community.status = 2;
            this.getMyCollection();
            break
          }
          case 'record': {
            this.navList.map((item) => {
              if (item.key === '2') {
                item.status = true
                item.timeList.map((str) => {
                  if (str.key === 'record') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.homePageType = false;
            this.community.type = true;
            this.settingsObj.type = false;
            this.settingsObj.nick = false;
            this.message.type = false;
            this.community.status = 3;
            this.getHistory();
            break
          }
        }
      }
    },
    components: {
      'v-nav': Nav,
      'v-sw': sw,
      'v-homePage': homePage,
      'v-replyContent': replyContent,
      'v-themeContent': themeContent,
      'v-collectionContent': collectionContent,
      'v-historyContent': historyContent,
      'v-setUp': setUp,
      'v-edit': editPass,
      'v-message': messageList
    }
  }
</script>

<style lang="scss" scoped>
  .personalAccount {
    width: 100%;
    height: 500px;
    .account {
      border: 1px solid #d3d3d3;
      width: 80%;
      margin: 20px auto 0;
    }
  }

  .account_right {
    height: 500px;
    border-left: 1px solid #d3d3d3;
    overflow-y: auto;
    padding-bottom: 20px;
    position: relative;
  }

  .tagBox {
    padding: 20px 30px;
    text-align: right;
  }

  .tag {
    color: #B2A8CB;
    background: #fff;
    border: 1px solid #d3d3d3;
    width: auto;
  }

</style>
