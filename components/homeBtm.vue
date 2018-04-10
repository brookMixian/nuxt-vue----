<template>
  <section class="home_btm">
    <slot></slot>
    <el-row class="infor">
      <el-col :span="8" class="inforCol item">
        <img src="~assets/pbox.svg" alt="">
      </el-col>
      <el-col :span="8" class="inforCol item">
        <span>电话：0571-26695555-2-1</span>
      </el-col>
      <el-col :span="8" class="inforCol">
        <div class="code">
          <img src="~assets/code.jpg" alt="">
        </div>
        <span class="public">公众号</span>
      </el-col>
    </el-row>
    <!--<div>-->
      <!--<div>-->
        <!---->
      <!--</div>-->
      <!--<img src="~assets/pbox.svg" alt="">-->
      <!--<span>电话:0571-3333333</span>-->
    <!--</div>-->
  </section>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .home_btm {
    position: relative;
    background: url('../assets/buttom_zb.svg') no-repeat left bottom;
  }
  .infor{
    width: 80%;
    margin:auto;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #fff;
    .inforCol{
      text-align: center;
      height: 200px;
    }
    .code{
      width: 166px;
      height: 166px;
      margin: 0 auto;
      background: #fff;
      img{
        width: 166px;
        height: 166px;
      }
    }
    .item{
      line-height: 200px;
    }
    .public{
      position: relative;
      top:10px;
    }
  }

</style>
