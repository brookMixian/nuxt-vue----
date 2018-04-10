<template>
  <section class="bbs">
    <el-row class="bbs_item">
      <div  @click="viewsDetails(bbsObj.postId)">
        <div class="bbs_top">
          <el-col :span="24" class="title">{{bbsObj.postTitle}}</el-col>
          <el-col :span="24" class="content">{{bbsObj.postSummary }}</el-col>
        </div>
        <div class="bbs_btm">
          <el-col :span="8" class="information_xs">{{bbsObj.nickName }}</el-col>
          <el-col :span="16">
            <span><img src="~assets/praise.png" alt="">{{bbsObj.userLikeCount }}</span>
            <span><img src="~assets/message.png" alt="">{{bbsObj.postCommentCount }}</span>
            <span><img src="~assets/browse.png" alt="">{{bbsObj.viewCount }}</span>
          </el-col>
        </div>
      </div>
    </el-row>

  </section>

</template>

<script>
  export default {
    props: ['bbsObj'],
    methods: {
      viewsDetails(id) {
        this.$emit('viewsDetails', id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bbs {
    width: 100%;
  }

  .bbs_item {
    width: 100%;
    cursor: pointer;
    background: #FFFFFF;
    box-shadow: 0 4px 12px 0 #D2E1ED;
    border-radius: 10px;
    height: 240px;
    .bbs_top {
      padding: 34px;
      height: 180px;
      border-bottom: 1px solid #e6e6e6;
      .title{
        font-size: 16px;
        color: #404040;
        height: 40px;
        line-height: 40px;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow: hidden;
      }
      .content{
        font-size: 14px;
        color: #9c9c9c;
        height:98px;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
    .bbs_btm {
      padding: 0 20px;
      line-height: 50px;
      color: #dbdbdb;
      span {
        font-size: 14px;
        margin-left: 10px;
      }
      img {
        width: 20px;
        display: inline-block;
        vertical-align: text-bottom;
      }
    }

  }

</style>
