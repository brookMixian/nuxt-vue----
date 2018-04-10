<template>
  <v-bounces @emitClickPopup="$emit('emitClickPopup')">
    <section class="videoBounces">
      <el-row class="videoTop">
        <el-col :span="12" class="text_sm">插入视频</el-col>
        <el-col :span="12" class="text-right text_xs"><i class="el-icon-close" @click="close"></i></el-col>
      </el-row>
      <el-row class="videoMeddel">
        <el-col :span="6">
          <span class="links">链接上传：</span>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入url" v-model="linkUrl"></el-input>
        </el-col>
        <el-col :span="6" class="pd_top_20">
          <span class="links">本地上传：</span>
        </el-col>
        <el-col :span="16" class="pd_top_20">
          <input type="file" title="上传视频" accept="video/*" class="videoFlie" @change="upVideo">
        </el-col>
      </el-row>
      <el-row class="videoBtm">
        <el-col :span="24">
          <el-button type="primary" @click="determine">确定</el-button>
          <el-button @click="$emit('cancel')">取消</el-button>
        </el-col>
      </el-row>
    </section>
  </v-bounces>

</template>

<script>
  import bounces from '~/components/btm-bounces.vue'

  export default {
    components: {
      'v-bounces': bounces
    },
    props: ['videoObj'],
    data() {
      return {
        linkUrl: ''
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      determine() {
        this.$emit('determine', {
          linkUrl: this.linkUrl
        })
      },
      upVideo(event){
        this.$emit('upVideo',event)
      }
    }
  }
</script>

<style scoped lang="scss">
  .videoBounces {
    width: 400px;
    height: 260px;
    border-radius: 5px;
    background: #fff;
  }

  .videoTop {
    padding: 0 20px;
    line-height: 45px;
    background: #4a90e2;
  }

  .el-icon-close {
    cursor: pointer;
  }

  .videoMeddel {
    padding: 20px;
    .links {
      display: inline-block;
      line-height: 36px;
    }
  }

  .videoFlie {
    height: 36px;
    margin-top: 10px;
  }

  .videoBtm {
    padding: 0 20px;
  }

</style>
