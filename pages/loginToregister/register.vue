<template>
  <section class="register">
    <el-row>
      <el-col :span="24" class="prompt">
        <a class="btn_gray text_xs" @click="logJump()">已经有账号？立即登入</a>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="text-center pd_bottom_30">
        <h1 class="h1">注&nbsp;册</h1>
      </el-col>
      <el-col :span="24" class="text-center pd_bottom_30">
        <span class="gray">我们致力打造最高效、易用的量化交易平台</span>
      </el-col>
      <el-col :span="24">
        <div class="inp">
          <el-input placeholder="手机号" v-model="userTest.mobile"></el-input>
          <span class="information_waring" v-if="status.account_prompt">{{status.account_text}}</span>
        </div>
      </el-col>
      <el-col :span="24" class="pd_top_20">
        <div class="inp">
          <div class="inp_left">
            <el-input placeholder="验证码" v-model="Verification.code"></el-input>
          </div>
          <div class="inp_right">
            <button class="btn text_xs" @click="obtain()" :disabled="disabled" :class="{active:disabled}" type="button">
              {{Verification.text}}
            </button>
          </div>
        </div>
        <div class="inp">
          <span class="information_waring" v-if="status.code_prompt">{{status.code_text}}</span>
        </div>
      </el-col>
      <el-col :span="24" class="pd_top_20">
        <div class="inp">
          <el-input
            v-model="userTest.passWord"
            placeholder="新密码(6-20位,建议字母数字和符号的组合)" type="password"></el-input>
          <span class="information_waring" v-if="status.password_prompt">{{status.password_text}}</span>
        </div>

      </el-col>
      <el-col :span="24" class="pd_top_20">
        <div class="inp">
          <button class="btn text_xs" @click="sumbit()" :disabled="sumDisbled" :class="{active:sumDisbled}">提交</button>
        </div>
      </el-col>
    </el-row>

  </section>

</template>

<script>
  import {api} from '../../plugins/http/axios'

  export default {
    asyncData() {
      return {}
    },
    data() {
      return {
        userTest: {
          mobile: '',
          passWord: ''
        },
        status: {
          account_prompt: false,
          password_prompt: false,
          code_prompt: false,
          account_text: '手机号、不可为空',
          password_text: '密码、不可为空',
          code_text: '验证码、不可为空'
        },
        Verification: {
          code: '',
          text: '获取手机验证码'
        },
        time: 60,
        disabled: false,
        sumDisbled: true
      }
    },
    head() {
      return {
        title: '用户注册'
      }
    },
    methods: {
      getSumbitRegister() {
        let userInfoDo = {
          "mobile": this.userTest.mobile,
          "passWord": this.userTest.passWord
        };
        api.reg(userInfoDo).then((res) => {
          console.log(res, '注册成功')
        })
      },
      obtain() {
        if (this.userTest.mobile) {
          let myReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (!myReg.test(this.userTest.mobile)) {
            this.status.account_prompt = true
            this.status.account_text = '请输入合法的手机号'
          } else {
            this.sumDisbled = false;
            let t = setInterval(() => {
              if (this.time < 2) {
                this.time = 60;
                this.disabled = false;
                this.Verification.text = '获取手机验证码';
                clearInterval(t)
              } else {
                this.disabled = true;
                this.time--;
                this.Verification.text = "重新发送需要(" + this.time + ")";
              }
            }, 1000)
          }
        } else {
          this.status.account_prompt = true
          this.status.account_text = '手机号、不可为空'
        }
      },
      sumbit() {
        if (this.userTest.mobile && this.userTest.passWord && this.Verification.code) {
          if (this.userTest.passWord.length < 6) {
            this.userTest.passWord = null;
            this.$message({
              message: '请输入6位及以上密码',
              type: 'warning',
              duration: 1500
            });
          } else {
            this.getSumbitRegister();
          }
        } else if (!this.userTest.mobile) {
          this.status.account_prompt = true
        } else if (!this.Verification.code) {
          this.status.code_prompt = true;
        } else if (!this.userTest.passWord) {
          this.status.password_prompt = true;
        }
      },
      logJump() {
        this.$router.push({
          path: "/loginToregister/login"
        })
      }
    },
    watch: {
      'userTest.mobile'(v) {
        if (v) {
          this.status.account_prompt = false
        }
      },
      'userTest.passWord'(v) {
        if (v) {
          this.status.password_prompt = false
        }
      },
      'Verification.code'(v) {
        if (v) {
          this.status.code_prompt = false
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
    overflow: hidden;
    div {
      height: 36px;
    }
    .inp_left {
      width: 320px;
      float: left;
    }
    .inp_right {
      width: 200px;
      float: right;
      button {
        height: 36px;
        border-radius: 4px;
      }
    }
  }

  .btn {
    &.active {
      background: #c4c4c4;
      cursor: not-allowed;
    }
    &:active {
      background: #526488;
    }
  }

</style>
