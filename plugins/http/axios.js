import * as axios from 'axios'

// if (process.env.baseUrl) {
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://192.168.152.234:8088/tfs-forums';
// 192.168.152.234:8088
axios.create({
  withCredentials: true
});
// Vue.config.debug = true;
// axios.defaults.withCredentials=true;
// axios.defaults.headers['Content-Type'] = 'multipart/form-data'
// }

// let headers_form = {'Content-Type': 'multipart/form-data'};
let headers_json = {'Content-Type': 'application/json;charset=UTF-8'};
let config = {
  headers: {'Content-Type': 'multipart/form-data'}
};


let qs = require('qs');
// let options = {}
// if (process.SERVER_BUILD) {
//   axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }
// axios.create(options)
const api = {
  log(data) {
    return axios.post('/user/user-login', qs.stringify(data)).then((res) => {
      return res
    })
  },
  reg(data) {
    return axios.post('/user/register', data).then((res) => {
      return res
    })
  },
  user(data) {
    return axios.post('/user/qry-userInfo', qs.stringify(data)).then((res) => {
      return res
    })
  },
  home(data) {
    return axios.post('/index/index-post', qs.stringify(data)).then((res) => {
      return res
    })
  },
  upLoadHead(data, config) {
    return axios.post('/user/mod-userPortrait?token=' + window.sessionStorage.getItem('token'), data, config).then((res) => {
      return res
    })
  },
  messageCenter(data) {
    // @我的消息
    return axios.post('/postComment/at-user?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  commentsMessage(data) {
    // 评论消息
    return axios.post('/postComment/comment-user-post?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  messagePrompt(data) {
    // 消息提示
    return axios.post('/postComment/new-comment-list?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  viewMessage(url, data) {
    // 查看消息
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  myTheme(data) {
    // 我的主题
    return axios.post('/post/user-post?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  myReply(data) {
    // 我的回复
    return axios.post('/postComment/user-comment?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  myCollection(data) {
    // 我的收藏
    return axios.post('/collect/user-collect?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  history(data) {
    // 浏览记录
    return axios.post('/postViewLog//user-view?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  accountSet(data) {
    return axios.post('/user/mod-userInfo?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  editPass(data) {
    return axios.post('/user/mod-userPass?token=' + window.sessionStorage.getItem('token'), qs.stringify(data)).then((res) => {
      return res
    })
  },
  menuList(data) {
    // 学堂目录
    return axios.post('/menu/menu-list', qs.stringify(data)).then((res) => {
      return res
    })
  },
  qryPostList(url, data) {
    // 学堂目录下帖子
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  userRoleList(data) {
    // 授权列表
    return axios.post('/userRole/user-role-list', data).then((res) => {
      return res
    })
  },
  authorization(url, data) {
    // 授权操作
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  menuModify(data) {
    // 菜单修改
    return axios.post('/menu/mod-menu', data).then((res) => {
      return res
    })
  },
  menuAdd(data) {
    // 菜单新增
    return axios.post('/menu/add-menu', data).then((res) => {
      return res
    })
  },
  menuDelete(url, data) {
    // 菜单删除
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  postingImg(url, data, config) {
    // 帖子图片上传
    return axios.post(url, data, config).then((res) => {
      return res
    })
  },
  postingVideo(url, data, config) {
    // 帖子视频上传
    return axios.post(url, data, config).then((res) => {
      return res
    })
  },
  postingId(data) {
    // 发帖id
    return axios.post('/post/getSeq', data).then((res) => {
      return res
    })
  },
  postManagement(data) {
    // 帖子管理
    return axios.post('post/qry-post-list', data).then((res) => {
      return res
    })
  },
  addPosting(data) {
    // 发帖
    return axios.post('/post/add-post?token=' + window.sessionStorage.getItem('token'), data).then((res) => {
      return res
    })
  },
  postingDigest(url, data) {
    // 帖子加精
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  delPosting(url, data) {
    // 删除帖子
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  restorePosting(url, data) {
    // 恢复帖子
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  modifyPosting(url, data) {
    // 修改帖子
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  postingDetails(url, data) {
    // 帖子详情
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  postingComment(url, data) {
    // 评论列表
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  releaseComments(url, data) {
    // 发布评论
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  giveLike(url, data) {
    // 点赞
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  delGiveLike(url, data) {
    // 取消点赞
    return axios.post(url, data).then((res) => {
      return res
    })
  },
  addCollection(url, data) {
    // 收藏
    return axios.post(url, data).then((res) => {
      return res
    })
  }
}
export {api}
