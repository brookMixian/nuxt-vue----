<template>
  <section class="homePage">
    <el-row class="homePage_row">
      <el-col :span="16">
        <div class="upFile">
          <!--<form method="post" :action="url" id="fileForm" enctype="multipart/form-data">-->
          <input type="file" class="file" title="上传头像" accept="image/png,image/jpeg" @change="onChange"
                 name="uploadFile">
          <!--<input type="submit" value="提交">-->
          <!--</form>-->
          <img v-if="homePageList.userPortrait" :src="homePageList.userPortrait" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <span class="information_sm coarse vertical">
         {{homePageList.nickName?homePageList.nickName:homePageList.mobile}}
          <i class="el-icon-edit name_xs" @click="$emit('modfiyNick')"></i>
        </span>
      </el-col>
      <el-col :span="8">
        <div class="col">
          <p>收藏者</p>
          <span>{{homePageList.userCollectCount}}</span>
        </div>
        <div class="col">
          <p>收藏</p>
          <span>{{homePageList.collectCount}}</span>
        </div>
        <div class="clear">
        </div>

      </el-col>
    </el-row>
    <el-row class="homePage_row">
      <el-col :span="24">
        <v-title name="累计登入"></v-title>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_10">
        <el-col :span="2">上月：</el-col>
        <el-col :span="10">累计登入<i class="red">&nbsp;{{homePageList.loginCountNow}}&nbsp;</i>天</el-col>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_10">
        <el-col :span="2">本月：</el-col>
        <el-col :span="10" class="theLength">
          <el-progress :percentage="homePageList.len"></el-progress>
          <span class="red">{{homePageList.loginCountLast}}天</span>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="homePage_row">
      <el-col :span="24">
        <v-title name="课程推荐"></v-title>
      </el-col>
    </el-row>
  </section>

</template>

<script>
  import title from '~/components/focusTitle.vue'

  export default {
    asyncData() {
      return {}
    },
    data() {
      return {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: ''
        // interfaceUrl: 'http://192.168.152.132:8088/tfs-forums/user/mod-userPass'
      }
    },
    props: ['imageUrl', 'homePageList', 'interfaceUrl', 'upLoadData'],
    methods: {
      handleAvatarSuccess() {
        this.$emit('handleAvatarSuccess')
      },
      beforeAvatarUpload(file) {
        this.$emit('beforeAvatarUpload', file)
      },
      onChange(event) {
        this.$emit('update', event)
      },
      comfirmAction() {
        this.$emit('comfirmAction')
      }
    },
    mounted() {
      this.url = 'http://192.168.152.132:8088/tfs-forums/user/mod-userPortrait?token=' + window.sessionStorage.getItem('token');
      // this.upLoadData.token = window.sessionStorage.getItem('token')
    },
    components: {
      'v-title': title
    }
  }
</script>

<style lang="scss" scoped>
  .homePage_row {
    width: 90%;
    margin: 20px auto 0 auto;
  }

  .theLength {
    position: relative;
    .red {
      position: absolute;
      width: 50px;
      text-align: left;
      padding-left: 10px;
      top: 0;
      background: #fff;
      left: 216px;
    }
  }

  .vertical {
    display: inline-block;
    vertical-align: top;
  }

  .upFile {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px #d3d3d3 solid;
    cursor: pointer;
    .file {
      width: 60px;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
      cursor: pointer;
      right: 0;
      opacity: 0;
      filter: alpha(opacity=0); /*兼容ie*/
      position: absolute;
    }

  }

  .information_sm {
    margin-left: 20px;
    cursor: pointer;
    &:hover .el-icon-edit {
      display: inline-block;
    }
  }

  .col {
    float: right;
    padding-top: 10px;
    height: 60px;
    width: 80px;
    text-align: center;
  }

  .el-icon-edit {
    display: none;
  }

  .avatar-uploader {
    width: 60px;
    display: inline-block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover .up_tx {
      display: block;
    }
    .up_tx {
      position: absolute;
      left: 0;
      height: 20px;
      width: 60px;
      display: none;
      background: rgba(0, 0, 0, .2);
      bottom: 0;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    border: 1px dashed #d3d3d3;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

</style>
