import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    roleNum: '',
    loginSuccess: false,
    nickname: null,
    uid: 0,
    message: null
  },
  mutations: {
    setNickname(state, name) {
      state.nickname = name
    },
    setRoleNum(state, num) {
      // 控制权限模块
      state.roleNum = num
    },
    setAccount(state, status) {
      // 控制个人中心模块
      state.loginSuccess = status
    },
    setMessagePrompt(state, m) {
      // 消息提示
      state.message = m;
    }
  },
  getters: {
    roleNum(state) {
      return state.roleNum
    },
    loginInformation(state) {
      return state.loginSuccess
    },
    nickName(state) {
      return state.nickname
    },
    messagePrompt(state) {
      return state.message
    }
  }
})

export default store
