<template>
  <section class="content">
    <!--个人中心-我的主题list组件-->
    <el-row v-for="(item,i) in contentObj" class="content_row" :key="i">
      <el-col :span="24" class="name_xx text-right">{{item.createTimeStr?item.createTimeStr:'没有更多了'}}</el-col>
      <el-col :span="24" class="information_sm coarse pd_top_5"><a class="information_sm"
                                                                   @click="viewPost(item.postId)">{{item.postTitle?item.postTitle:'没有更多了'}}</a>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin: 20px auto 0" class="text-center">
        <el-pagination
          @current-change="handleCurrentChange($event)"
          :current-page.sync="themePage.currentPage"
          :page-size="themePage.pageSize"
          layout="prev, pager, next, jumper"
          :total="themePage.total">
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
    props: ['contentObj', 'themePage'],
    methods: {
      handleCurrentChange(e) {
        this.$emit('themeHandleCurrentChange', e)
      },
      viewPost(id) {
        this.$emit('viewPost', id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 90%;
    padding-bottom: 20px;
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
