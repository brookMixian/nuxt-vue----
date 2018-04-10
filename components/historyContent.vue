<template>
  <section class="content">
    <!--个人中心-我的历史记录list组件-->
    <el-row v-for="(item,i) in contentObj" class="content_row" :key="i">
      <el-col :span="24" class="name_xx text-right">{{item.createTimeStr}}</el-col>
      <el-col :span="24" class="information_sm coarse"><a class="information_sm" @click="viewPost(item.postId)">{{item.postTitle}}</a></el-col>
    </el-row>

  </section>
</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    props: ['contentObj'],
    methods:{
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
