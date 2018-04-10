<template>
  <section class="atTop">
    <header class="row">
      <div class="col logo">
        <img src="~assets/pbox.svg" alt="">
      </div>
      <div class="col nav">
        <ul class="nav_ul">
          <li v-for="(item,i) in navObj.list" :class="{account:item.status}"
              v-if="item.type"
              :key="item.id">
            <a @click="navJump(item.id,i)">{{item.name}}</a>
            <div class="nav_up" v-if="item.status">
              <span @click="navJump('account')">{{nickName?nickName:nickNameNum}}</span>
              <span @click="navJump('message')" class="messageCen">
                消息
                <i class="messagePrompt" v-if="messagePrompt">{{messagePrompt}}</i>
              </span>
              <span v-if="roleNumStatus" @click="navJump('posting')">我要发帖</span>
              <span @click="navJump('exit')">退出</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="clear">
      </div>
    </header>
  </section>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        role: null,
        loginNum: null,
        nickNameNum: null,
        navObj: {
          toggleType: 0,
          sessIndex: null,
          list: [
            {
              name: '首页',
              id: 'home',
              status: false,
              type: true
            },
            {
              name: '量化学堂',
              id: 'school',
              status: false,
              type: true
            },
            {
              name: '登入',
              id: 'login',
              status: false,
              type: true
            },
            // {
            //   name: '免费注册',
            //   id: 'reg',
            //   status: false,
            //   type: true
            // },
            {
              name: '系统管理',
              id: 'system',
              status: false,
              type: false
            },
            {
              name: '个人账号',
              id: 'account',
              status: true,
              type: false
            }
          ]
        },
        roleNumStatus: false
      }
    },
    methods: {
      navJump(t, index) {
        this.navObj.sessIndex = index;
        switch (t) {
          case "home": {
            // 首页
            this.$router.push({
              path: '/'
            })
            break
          }
          case 'school': {
            // 量化学堂
            this.$router.push({
              path: "/room/classRoom"
            })
            break
          }
          case 'login': {
            // 登入
            this.$router.push({
              path: "/loginToregister/login"
            })
            break
          }
          case 'reg': {
            // 注册
            this.$router.push({
              path: "/loginToregister/register"
            })
            break
          }
          case 'account': {
            // 个人中心
            this.$router.push({
              path: "/personalCenter/account",
              query: {
                status: 'account'
              }
            })
            break
          }
          case 'system': {
            // 系统管理
            this.$router.push({
              path: "/systemManagement/systemIndex"
            })
            break
          }
          case 'message': {
            // 消息中心
            this.$router.push({
              path: "/personalCenter/account",
              query: {
                status: 'center'
              }
            })
            break
          }
          case 'posting': {
            // 发帖
            this.$router.push({
              path: "/systemManagement/posting"
            })
            break
          }
          case 'exit': {
            // 退出
            window.sessionStorage.removeItem('userId');
            this.setRoleNum(0);
            this.setAccount(0);
            this.$router.push({
              path: "/loginToregister/login"
            })
            break
          }
        }

      },
      toggleRoleNum(roleNum) {
        // 切换系统管理
        if (roleNum === '1000') {
          this.navObj.list.map((item) => {
            if (item.id === 'system') {
              item.type = true;
            }
          })
        } else {
          this.navObj.list.map((item) => {
            if (item.id === 'system') {
              item.type = false;
            }
          })
        }
      },
      toggleMessage(roleNum) {
        if (roleNum == 1000 || roleNum == 2000) {
          this.roleNumStatus = true
        } else {
          this.roleNumStatus = false
        }
      },
      toggleInformation(m) {
        if (m) {
          this.navObj.list.map((item) => {
            console.log(m, 'true')
            if (item.id === 'account') {
              item.type = true;
            }
            if (item.id === 'reg') {
              item.type = false;
              // item.type = true;
            }
            if (item.id === 'login') {
              // item.type = true;
              item.type = false;
            }
          })
        } else {
          console.log(m, 'fase')
          this.navObj.list.map((item) => {
            if (item.id === 'account') {
              item.type = false;
              // item.type = true;
            }
            if (item.id === 'reg') {
              item.type = true;
            }
            if (item.id === 'login') {
              item.type = true;
            }
          })
        }
      },
      ...mapMutations([
        'setRoleNum',
        'setAccount'
      ])
    },
    computed: {
      //获取state里面的listName对象
      ...mapGetters(['setRoleNum', 'loginInformation', 'nickName', 'messagePrompt'])
    },
    mounted() {
      let roleNum = window.sessionStorage.getItem('roleNum');
      let loginInformation = window.sessionStorage.getItem('success');
      this.nickNameNum = window.sessionStorage.getItem('nickname');
      console.log(this.roleNum, this.roleNum, '权限看看')
      this.toggleMessage(roleNum)
      this.toggleRoleNum(roleNum);
      this.toggleInformation(loginInformation);
    },
    watch: {
      'roleNum'(v) {
        this.toggleRoleNum(v)
        window.sessionStorage.setItem('roleNum', v);
        if (v == 1000 || v == 2000) {
          this.roleNumStatus = true
        } else {
          this.roleNumStatus = false
        }
      },
      'loginInformation'(v) {
        window.sessionStorage.setItem('success', v);
        this.toggleInformation(v)
      },
      'nickName'(v) {
        window.sessionStorage.setItem('nickname', v);
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    height: 50px;
    padding: 0 10px;
    background: #363C4A;
    /*border-bottom: 1px solid rgba(255, 255, 255, .2);*/
    .logo, .nav {
      height: 50px;
    }
    .logo {
      width: 20%;
      position: relative;
      img {
        position: absolute;
        left: 0;
        margin: auto;
        top: 0;
        bottom: 0;
      }
    }
    .nav {
      width: 80%;
      position: relative;
      .a {
        position: absolute;
        width: 200px;
        height: 30px;
        background: pink;
        z-index: 200;
        top: 50px
      }
    }
    .nav_ul {
      position: absolute;
      right: 0;
      top: 0;
      li {
        float: left;
        padding: 0 15px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        transition: .5s ease all;
        border-bottom: 3px solid #363C4A;
        &.active {
          color: #2678e4;
          border-bottom: 3px solid #2678e4;
        }
        a {
          display: inline-block;
          line-height: 47px;
        }
      }
      li:hover {
        color: #2678e4;
        border-bottom: 3px solid #2678e4;
      }
      .account {
        position: relative;
        &:hover .nav_up {
          display: block;
        }
      }

    }
  }

  .nav_up {
    position: absolute;
    top: 50px;
    width: 110px;
    background: #000826;
    right: -10px;
    display: none;
    z-index: 100;
    padding-bottom: 10px;
    span {
      display: block;
      text-align: center;
      width: 100px;
      margin: 10px auto 0;
      line-height: 40px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: #2678e4;
      }
    }
    .messageCen {
      position: relative;
      .messagePrompt {
        display: inline-block;
        background: red;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        line-height: 20px;
        text-align: center;
        right: 5px;
      }
    }
  }


</style>
