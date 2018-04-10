<template>
  <section class="about">
    <!--讨论组件-->
    <el-row id="scroll">
      <el-col :span="24" class="pd_top_20 aboutTop">
        <span class="portrait"><img :src="aboutObj.portrait" alt=""></span>
        <span class="span_b">{{aboutObj.nickName}}</span>
      </el-col>
      <el-col :span="24" class="pd_top_20 information_xs" :id="'a'+aboutObj.postCommentId">{{aboutObj.content}}</el-col>
      <el-col :span="24" class="pd_top_20 pd_bottom_30">
        <span class="gray">发布于&nbsp;&nbsp;{{timeConversion(aboutObj.createTime)}}</span>
        <span class="information_xs reply" @click="reply(aboutObj.userId,aboutObj.nickName)">回复</span>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import {tools} from '../plugins/common'

  export default {
    props: ['aboutObj', 'postCommentId'],
    methods: {
      timeConversion(time) {
        return tools.dateFormate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
      },
      reply(uid, name) {
        this.$emit('reply', {
          uid: uid,
          nickName: name
        })
      },
      scroolTo() {
        // 定位
        let postCommentId = this.$route.query.postCommentId;
        if (postCommentId) {
          tools.scrollTo('boss', this.postCommentId)
        }
      },
    },
    mounted() {
      this.scroolTo();
    }
  }
</script>

<style scoped lang="scss">
  .about {
    width: 100%;
  }

  .aboutTop {
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .span_b {
      margin-left: 10px;
    }
  }

  .portrait {
    display: inline-block;
    /*width: ;*/
    width: 45px;
    height: 45px;
    border-radius: 50%;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  .reply {
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: #4a90e2;
    }
  }

</style>
