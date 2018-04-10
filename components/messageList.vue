<template>
  <section class="message" v-if="messageList.length>0">
    <!--消息队列组件-->
    <el-row v-for="(item,i) in messageList" :key="i" class="messageItem">
      <el-col :span="24" class="pd_top_20 aboutTop">
        <span class="portrait"><img :src="item.portrait" alt=""></span>
        <span class="information_xs content"
              @click="viewMessage(item.postId,item.postCommentId)">{{item.content}}</span>
      </el-col>
      <el-col :span="24" class="pd_top_20 pd_bottom_30">
        <span class="gray">{{item.createTimeStr}}</span>
        <span class="span_b">{{item.nickName}}</span>
        <span class="gray" style="margin-left: 10px">评论了我的主题:<i class="postTitle information_xs">{{item.postTitle}}</i></span>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin: 20px auto 0" class="text-center">
        <el-pagination
          @current-change="handleCurrentChange($event)"
          :current-page.sync="messagePageInfo.pageIndex"
          :page-size="messagePageInfo.pageSize"
          layout="prev, pager, next, jumper"
          :total="messagePageInfo.total">
        </el-pagination>
      </div>
    </el-row>
  </section>
  <section class="message" v-else>
    <el-row>
      <el-col :span="24" class="messageNot">
         <span class="gray content">暂无最新消息...</span>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    props: ['messageList','messagePageInfo'],
    methods: {
      viewMessage(postId, postCommentId) {
        this.$emit('viewMessage', {
          postId: postId,
          postCommentId: postCommentId
        })
      },
      handleCurrentChange(e){
        this.$emit('messageHandleCurrentChange',e)
      }
    },
    mounted() {
      console.log(this.messageList.length, '多层')
    }
  }
</script>

<style scoped lang="scss">
  .message {
    width: 90%;
    margin: 20px auto 0 auto;
  }

  .messageItem {
    border-bottom: 1px #d3d3d3 solid;
  }

  .span_b {
    color: #255da8;
    font-size: 14px;
    margin-left: 10px;
  }

  .postTitle {
    margin-left: 10px;
  }

  .portrait {
    display: inline-block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  .aboutTop {
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .content {
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .messageNot{
    padding-bottom: 30px;
    border-bottom: 1px #d3d3d3 solid;
  }

</style>
