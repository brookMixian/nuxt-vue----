<template>
    <section class="focusTitle">
      <el-row>
        <el-col :span="24">
          <span></span>
          <span class="information_xs coarse">{{name}}</span>
        </el-col>
      </el-row>
    </section>
</template>

<script>
    export default {
      asyncData() {
        return {}
      },
      props: ['name']
    }
</script>

<style lang="scss" scoped>
  span{
    display: inline-block;
  }
  span:nth-of-type(1){
    background: #255da8;
    width: 3px;
    height: 14px;
    vertical-align: middle;
  }
  span:nth-of-type(2){
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
