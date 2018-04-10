<template>
  <section class="posting">
    <!--发帖-->
    <el-row>
      <el-col :span="24" class="pd_50 h1">社区发帖</el-col>
      <el-col :span="24" class="information_sm">标题：</el-col>
      <el-col :span="24" class="pd_top_10">
        <div class="col directory">
          <el-select v-model="menuVal" placeholder="请选择所属目录">
            <el-option v-for="item in maintenanceObj.data" :key="item.menuId" :label="item.menuName"
                       :value="item.menuId"></el-option>
          </el-select>
        </div>
        <div class="col title">
          <el-input placeholder="请输入主题标题" v-model="postTitle"></el-input>
        </div>
        <div class="clear">
        </div>
      </el-col>
      <el-col :span="24" class="pd_top_20 information_sm">帖子简介：</el-col>
      <el-col :span="24" class="pd_top_10">
        <el-input type="textarea"
                  :maxlength="50"
                  v-model="postSummary"
                  placeholder="请输入简介，最多输入50字"
                  autosize></el-input>
      </el-col>
      <el-col :span="24" class="pd_top_20 information_sm" style="margin-bottom: 10px">内容：</el-col>
    </el-row>
    <div class="quill-editor"
         ref="myQuillEditors"
         v-model="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
    <div class="upload_sc" :style="{left:upFileObj.left}">
      <input type="file" class="upFile" id="upFile" multiple="multiple" title="上传图片" @change="uploadImg">
    </div>
    <!--<div class="upload_video">-->

    <!--</div>-->
    <el-row>
      <el-col :span="24" class="text-right pd_top_20">
        <button class="btn btn1" @click="sumbit()">提交</button>
      </el-col>
    </el-row>
    <v-video v-if="videoStatus"
             @close="videoStatus=false"
             @cancel="videoStatus=false"
             @determine="determine($event)"
             @upVideo="uploadVideo($event)"
             @emitClickPopup="videoStatus=false"></v-video>
  </section>
</template>
<script>
  import {api} from '../../plugins/http/axios'
  import video from '~/components/videoBounces.vue'

  export default {
    asynData() {
      return {}
    },
    head() {
      return {
        title: '系统管理'
      }
    },
    data() {
      return {
        postIngObj: null,
        postingId: null,
        postTitle: '',
        postSummary: '',
        menuVal: '',
        upFileObj: {
          top: '',
          left: ''
        },
        content: '',
        url: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['link', 'image', 'video']
            ]
          }
        },
        addRange: 0,
        addVideo: 0,
        videoStatus: false,
        videoObj: {
          linkUrl: ''
        },
        maintenanceObj: {
          data: []
        }
      }
    },
    methods: {
      getPostingId() {
        api.postingId().then((res) => {
          if (res.data.success) {
            console.log('postId', res)
            this.postingId = res.data.data.postId;
          }
        }).catch((err) => {

        })
      },
      getMenuList() {
        api.menuList().then((res) => {
          if (res.data.success) {
            this.maintenanceObj.data = res.data.data;
          }
          console.log(res, '目录列表')
        }).catch((err) => {
          console.log(err, '列表')

        })
      },
      getAddposting() {
        // 发帖
        let data = {
          postId: this.postingId,
          postTitle: this.postTitle,
          menuId: this.menuVal,
          postContext: this.content,
          postSummary: this.postSummary
        }
        api.addPosting(data).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.$router.push({
                  path: '/room/classRoom'
                })
              })
            })
          }
        }).catch((err) => {
          console.log(err, '发帖失败')
        })

      },
      getPostdetails(e) {
        // 帖子详情-回填
        let url = '/post/show-post';
        let data = {
          postId: e.obj.postId,
          userId: e.obj.userId
        }
        api.postingDetails(url, data).then((res) => {
          if (res.data.success) {
            this.postTitle = res.data.data.postTitle;
            this.menuVal = res.data.data.menuId;
            this.postSummary = res.data.data.postSummary;
            this.content = res.data.data.postContext;
          }
          console.log(res, '帖子详情成功')
        }).catch((err) => {

        })
      },
      onFileChange() {
        console.log('sasasa')
      },
      uploadImg(e) {
        // 富文本上传图片
        let files = e.target.files[0];
        let isJpgAndPng = e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png';
        let formData = new FormData();
        let url = '/post/add-pic?token=' + window.sessionStorage.getItem('token');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        formData.append('multipartFile', files);//参数一
        formData.append('postId', this.postingId);// 参数二
        if (!isJpgAndPng) {
          this.$message({
            message: '只支持png和jpg图片',
            type: 'error',
            duration: 1000
          });
        } else {
          api.postingImg(url, formData, config).then((res) => {
            if (res.data.success) {
              console.log(res, '上传图片')
              this.upScuccess(res.data.data)
            } else {
              this.$message({
                message: res.data.message,
                type: 'info',
                duration: 1000
              });
            }
          }).catch((err) => {
            this.$message({
              message: '上传失败',
              type: 'error',
              duration: 1000
            });
          })
        }
      },
      uploadVideo(e) {
        let isMp4 = e.target.files[0].type === 'video/mp4';
        let files = e.target.files[0];
        let formData = new FormData();
        let url = '/post/add-video?token=' + window.sessionStorage.getItem('token');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        formData.append('multipartFile', files);//参数一
        formData.append('postId', this.postingId);// 参数二
        if (!isMp4) {
          this.$message({
            message: '只能上传MP4格式视频',
            type: 'error',
            duration: 1000
          });
        } else {
          api.postingVideo(url, formData, config).then((res) => {
            if (res.data.success) {
              this.videoStatus = false;
              this.videoSuccess(res.data.data)
            } else {
              this.$message({
                message: res.data.message,
                type: 'info',
                duration: 1000
              });
            }
          }).catch((err) => {
            this.$message({
              message: '上传失败',
              type: 'error',
              duration: 1000
            });
          })
        }

      },
      upScuccess(url) {
        // 上传图片成功回调
        this.myQuillEditor.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', url) // 把上传成功的图片插入到编辑器中
      },
      videoSuccess(url) {
        // 上传图片成功回调
        this.myQuillEditor.insertEmbed(this.addVideo !== null ? this.addVideo.index : 0, 'video', url) // 把上传成功的视频插入到编辑器中
      },
      determine(e) {
        if (e.linkUrl) {
          this.videoSuccess(e.linkUrl)
        }
        this.videoStatus = false;
      },
      onEditorBlur(editor) {

      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({editor, html, text}) {
        this.content = html
      },
      sumbit() {
        if (this.postTitle && this.content && this.postSummary && this.menuVal) {
          this.getAddposting();
        } else if (!this.menuVal) {
          this.$message({
            type: 'warning',
            message: '请选择目录',
            duration: 1000
          })
        } else if (!this.postTitle) {
          this.$message({
            type: 'warning',
            message: '请输入标题',
            duration: 1000
          })
        } else if (!this.postSummary) {
          this.$message({
            type: 'warning',
            message: '请输入简介',
            duration: 1000
          })
        } else if (!this.content) {
          this.$message({
            type: 'warning',
            message: '请输入内容',
            duration: 1000
          })
        }
        // console.log(this.content, '哈哈哈')
      },
      videoHandler() {
        console.log(111)
      },
      imgHandler(state) {
        this.addRange = this.myQuillEditor.getSelection();
        console.log(state, '成功了')
        if (state) {
          let fileInput = document.getElementById('upFile');
          fileInput.click() // 加一个触发事件
        }
      },
      videoHandler(state) {
        this.addVideo = this.myQuillEditor.getSelection();
        if (state) {
          // alert(state)
          this.videoStatus = true;
          // console.log(addVideo, '你是什么')
        }


      }
    },
    created() {
      this.postIngObj = this.$route.query.postIngObj;
    },
    watch: {
      'postIngObj'(v) {
        if (v) {
          this.getPostdetails(this.postIngObj)
        }
        console.log(v, '看一下你的值')
      }
    },
    mounted() {
      this.getPostingId();
      this.getMenuList();
      this.$nextTick(() => {
        this.myQuillEditor.getModule('toolbar').addHandler('image', this.imgHandler) // 给icon图片图标绑定一个事件
        this.myQuillEditor.getModule('toolbar').addHandler('video', this.videoHandler) // 给视频图标绑定一个事件
        console.log('refs', this.$refs.myQuillEditors.quill)
        console.log('11', this.myQuillEditor.getModule('toolbar'))
      })
    },
    components: {
      'v-video': video
    }
  }
</script>

<style lang="scss">
  .posting {
    width: 80%;
    padding-bottom: 100px;
    margin: 0 auto;
  }

  .link {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: absolute;
    left: 0;
    background: #4a90e2;
  }

  .ql_upLoad {
    padding-top: 20px;
    width: 100%;
    height: 200px;
    #file {
      /*width: 100px;*/
    }
  }

  .ql-toolbar {
    position: relative;
  }

  .quill-editor {
    position: relative;
  }

  .upload_sc {
    z-index: -1;
    width: 20px;
    height: 20px;
    background: red;
    position: absolute;
    /*background: url('../../assets/upload_04.png') no-repeat;*/
    background-size: 100%;
    top: 330px;
    cursor: pointer;
    opacity: 0;
    &:hover {
      /*background: url('../../assets/upload_3.png') no-repeat;*/
      background-size: 100%;
    }
    .upFile {
      width: 20px;
      height: 20px;
      position: relative;
      bottom: 20px;
      /*opacity: 1 !important;*/
      font-size: 0;
      cursor: pointer !important;
    }
  }

  .bd_upLoad {
    color: #06c;
    cursor: pointer;
  }

  .ql-snow .ql-tooltip {
    left: 0 !important;
  }

  .ql-snow .ql-tooltip[data-mode=video]:before {
    content: "外链接上传:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action:after {
    border-right: 0;
    content: "保存";
    padding-right: 0;
  }

  // 富文本编辑器
  .ql-editor {
    height: 400px !important;
  }

  .btn1 {
    width: 100px;
    height: 40px;
  }

  .upload_bd {
    width: 100%;
  }

  .directory {
    width: 20%;
  }

  .title {
    padding-left: 20px;
    width: 80%;
  }

</style>
