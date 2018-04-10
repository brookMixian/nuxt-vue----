<template>
  <section class="content">
    <!--个人中心-我的收藏list组件-->
    <el-row v-for="(item,i) in contentObj" class="content_row" :key="i">
      <el-col :span="24" class="name_xx text-right">{{item.createTimeStr}}</el-col>
      <el-col :span="24" class="information_sm coarse"><a class="information_sm"  @click="viewPost(item.postId)">{{item.postTitle}}</a></el-col>
    </el-row>
    <el-row>
      <div style="margin: 20px auto 0" class="text-center">
        <el-pagination
          @current-change="handleCurrentChange($event)"
          :current-page.sync="collectionPage.currentPage"
          :page-size="collectionPage.pageSize"
          layout="prev, pager, next, jumper"
          :total="collectionPage.total">
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
    props: ['contentObj','collectionPage'],
    methods:{
      handleCurrentChange(e){
        this.$emit('collectionHandleCurrentChange',e)
      },
      viewPost(id) {
        this.$emit('viewPost', id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    width: 90%;
    margin: 0 auto;
    .content_row{
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #d3d3d3;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  .information_xs {
    margin-left: 10px;
  }
  .information_sm{
    cursor: pointer;
  }

</style>
