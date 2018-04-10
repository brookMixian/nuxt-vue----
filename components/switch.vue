<template>
  <section class="sw">
    <!--tab 切换组件-->
    <div class="sw_row">
      <span class="sw_col information_xs" v-for="(item,index) in swList" :key="item.key" :class="{active:index===status}">
        <a @click="tab(index)" :class="{active:index===status}">{{item.name}}</a>
      </span>
    </div>

  </section>

</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    props: ['swList', 'status'],
    methods: {
      tab(index) {
        this.$emit('tab', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sw {
    width: 90%;
    margin: 0 auto;
    .sw_row {
      margin-top: 20px;
      line-height: 40px;
      border-bottom: 1px solid #d3d3d3;
    }
  }

  .sw_col {
    display: inline-block;
    &.active {
     position: relative;
      top:1px;
    }
    a {
      background: #fff;
      display: inline-block;
      line-height: 40px;
      text-align: center;
      padding: 0 30px;
      cursor: pointer;
      &:hover{
        background: #d3d3d3;
      }
      &.active {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        color: #255da8;
        cursor: default;
        border-top: 1px solid #d3d3d3;
        border-bottom: none;
        border-left: 1px solid #d3d3d3;
        border-right: 1px solid #d3d3d3;
        &:hover{
          background: #fff;
        }
      }

    }
  }

</style>
