<template>
  <section class="content">
    <!--个人中心-回复组件-->
    <el-row v-for="(item,i) in contentObj" class="content_row" :key="i">
      <el-col :span="24" class="name_xx text-right">{{item.createTimeStr}}</el-col>
      <el-col :span="24" class="information_sm coarse"><a @click="viewReply(item.postId,item.postCommentId)"
                                                          class="information_sm">{{item.postName}}</a>
      </el-col>
      <el-col :span="24" class="pd_top_10">
        <span class="name_xs">回复:</span>
        <span class="information_xs">{{item.content}}</span>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin: 20px auto 0" class="text-center">
        <el-pagination
          @current-change="handleCurrentChange($event)"
          :current-page.sync="replyPage.currentPage"
          :page-size="replyPage.pageSize"
          layout="prev, pager, next, jumper"
          :total="replyPage.total">
        </el-pagination>
      </div>
    </el-row>

  </section>
</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    props: ['contentObj', 'replyPage'],
    methods: {
      handleCurrentChange(e) {
        this.$emit('replyHandleCurrentChange', e)
      },
      viewReply(postId, postCommentId) {
        this.$emit('viewReply', {
          postId: postId,
          postCommentId: postCommentId
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 90%;
    margin: 0 auto;
    .content_row {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #d3d3d3;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .information_xs {
    margin-left: 10px;
  }

  .information_sm {
    cursor: pointer;
  }

</style>
