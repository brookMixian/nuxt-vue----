<template>
  <section class="login">
    <el-row>
      <el-col :span="24" class="prompt">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="text-center pd_bottom_30">
        <h1 class="h1">登&nbsp;入</h1>
      </el-col>
      <el-col :span="24" class="text-center pd_bottom_30">
        <span class="gray">我们致力打造最高效、易用的量化交易平台</span>
      </el-col>
      <el-col :span="24">
        <div class="inp">
          <el-input placeholder="手机号"
                    @focus="focusDow(0)"
                    @blur="toggle_down.type_account=false"
                    @change="changeDow(0,$event)"
                    v-model="login.account"></el-input>
          <span class="information_waring" v-if="status.account_prompt">{{status.account_text}}</span>
          <div class="drop_down"
               v-if="toggle_down.type_account"
               @mouseover="hoverDow(0)"
               @mouseout="removeDow(0)"
               @click="activeDow(0)"
               :class="{activeHover:put.type_account}">
            <p class="information_xx coarse">{{session_name}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="pd_top_20">
        <div class="inp">
          <el-input placeholder="请输入密码"
                    @focus="focusDow(1)"
                    @change="changeDow(1,$event)"
                    @blur="toggle_down.type_pass=false"
                    v-model="login.password"
                    type="password"></el-input>
          <span class="information_waring" v-if="status.password_prompt">{{status.password_text}}</span>
          <!--<span class="name_xx wjmi" @click="forgetJump()">忘记密码</span>-->
          <div class="drop_down" v-if="toggle_down.type_pass">
            <p class="information_xx">使用以下项的密码：</p>
            <p class="information_xx coarse"
               @mouseover="hoverDow(1)"
               @mouseout="removeDow(1)"
               @click="activeDow(1)"
               :class="{activeHover:put.type_pass}">
              {{session_password}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="pd_top_20">
        <div class="inp">
          <button class="btn btn_dr text_sm" @click="loginTo()">登入</button>
        </div>
      </el-col>
      <!--<el-col :span="24" class="pd_top_20">-->
      <!--<div class="inp text-right prompt">-->
      <!--<a class="btn_gray text_xs" @click="regJump()">还没有账号立即注册</a>-->
      <!--</div>-->
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
  import {api} from '../../plugins/http/axios'
  import {mapMutations} from 'vuex'

  export default {
    asyncData() {
      return {
        title: 'nuxt',
        session_name: '',
        session_password: '',
        toggle_down: {
          type_account: false,
          type_pass: false
        },
        put: {
          type_account: false,
          type_pass: false
        },
        status: {
          account_prompt: false,
          password_prompt: false,
          account_text: '账号、不可为空',
          password_text: '密码、不可为空'
        },
        login: {
          account: '',
          password: ''
        }
      }
    },
    head() {
      return {
        title: '登录'
      }
    },
    methods: {
      getLogin() {
        //  登入接口
        console.log(this.login.password)
        let data = {
          mobile: this.login.account,//13616710902
          password: md5(this.login.password) //123
        };
        api.log(data).then((res) => {
          if (res.data.success) {
            console.log(res, res.data.data.uid, '登入成功')
            // this.$message(res.data.message);
            window.sessionStorage.setItem('token', res.data.data.token);
            window.sessionStorage.setItem('userId', res.data.data.uid);
            // vuex传值，记录用户登入信息和状态
            let ncikname = res.data.data.nickName ? res.data.data.nickName : res.data.data.mobile;
            this.setRoleNum(res.data.data.roleNum);
            this.setAccount(res.data.success);
            this.setNickname(ncikname);
            // if (res.data.data.roleNum) {
            //   window.sessionStorage.setItem('status', '1')
            // }
            this.$router.push({
              path: '/'
            })
          } else {
            this.$message(res.data.message);
          }
        }).catch((err) => {
          console.log(err, '212')
        })
      },
      loginTo() {
        // 登入事件
        if (this.login.account && this.login.password) {
          let myReg = /^1(3|4|5|7|8)\d{9}$/;
          if (!myReg.test(this.login.account)) {
            this.login.account = null;
            this.status.account_prompt = true;
            this.status.account_text = '请输入合法的手机号'
          } else {
            this.getLogin();
            console.log('登入请求')
          }
        } else if (!this.login.account) {
          this.status.account_prompt = true;
        } else if (!this.login.password) {
          this.status.password_prompt = true;
        }
      },
      hoverDow(index) {
        // 鼠标放上
        switch (index) {
          case 0: {
            this.put.type_account = true;
            this.put.type_pass = false;
            this.login.account = window.sessionStorage.getItem('account');
            this.login.password = window.sessionStorage.getItem('password');
            break
          }
          case 1: {
            this.put.type_pass = true;
            this.put.type_account = false;
            this.login.account = window.sessionStorage.getItem('account');
            this.login.password = window.sessionStorage.getItem('password');
            break
          }
        }
      },
      removeDow(index) {
        // 移开
        switch (index) {
          case 0: {
            this.login.account = '';
            this.login.password = '';
            break
          }
          case 1: {
            this.login.account = '';
            this.login.password = '';
            break
          }
        }
      },
      activeDow(index) {
        // 鼠标点击
        switch (index) {
          case 0: {
            this.login.password = window.sessionStorage.getItem('password');
            this.login.account = window.sessionStorage.getItem('account');
            this.toggle_down.type_account = false;
            this.toggle_down.type_pass = false;
            break
          }
          case 1: {
            this.login.password = window.sessionStorage.getItem('password');
            this.login.account = window.sessionStorage.getItem('account');
            this.toggle_down.type_account = false;
            this.toggle_down.type_pass = false;
            break
          }
        }
      },
      focusDow(index) {
        // 获取焦点
        switch (index) {
          case 0: {
            if (this.session_name) {
              if (this.login.account) {
                this.toggle_down.type_account = false;
              } else {
                this.toggle_down.type_account = true;
                this.toggle_down.type_pass = false;
              }
            } else {
              this.toggle_down.type_account = false;
            }
            break
          }
          case 1: {
            if (this.session_password) {
              if (this.login.password) {
                this.toggle_down.type_pass = false;
              } else {
                this.toggle_down.type_pass = true;
                this.toggle_down.type_account = false;
              }
            } else {
              this.toggle_down.type_pass = false;
            }

            break
          }
        }
      },
      changeDow(index, e) {
        // 数值改变
        switch (index) {
          case 0: {
            if (e) {
              this.toggle_down.type_account = false;
            } else {
              this.toggle_down.type_account = true;
            }
            break
          }
          case 1: {
            if (e) {
              this.toggle_down.type_pass = false;
            } else {
              this.toggle_down.type_pass = true;
            }
            break
          }
        }
      },
      forgetJump() {
        this.$router.push({
          path: "/loginToregister/forgetPass"
        })
      },
      regJump() {
        this.$router.push({
          path: "/loginToregister/register"
        })
      },
      ...mapMutations([
        'setRoleNum',
        'setAccount',
        'setNickname'
      ])
    },
    mounted() {
      this.session_name = window.sessionStorage.getItem('account') ? window.sessionStorage.getItem('account') : null;
      this.session_password = window.sessionStorage.getItem('password') ? window.sessionStorage.getItem('account') : null;
    },
    watch: {
      'login.account'(v) {
        if (v) {
          this.status.account_prompt = false;
        }
      },
      'login.password'(v) {
        if (v) {
          this.status.password_prompt = false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>


  .inp {
    width: 540px;
    margin: 0 auto;
    position: relative;
    &.prompt {
      padding: 0;
    }
    .drop_down {
      position: absolute;
      left: 0;
      cursor: pointer;
      width: 540px;
      top: 36px;
      background: #fff;
      border: 1px solid #ddd;
      z-index: 1;
      &.activeHover {
        background: rgb(204, 229, 255);
      }
    }
    .wjmi {
      position: absolute;
      right: 5px;
      top: 10px;
      cursor: pointer;
    }
  }

  .activeHover {
    background: rgb(204, 229, 255);
  }

  .btn_dr {
    line-height: 36px;
    &:active {
      background: #204d74;
    }
  }


</style>
