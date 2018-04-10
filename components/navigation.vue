<template>
  <section class="navigation">
    <!--个人中心侧边栏-接收参数navList-格式为多层数组结构-->
    <el-row class="nav_child" v-for="(item,index) in navList" :key="index">
      <el-col :span="24" class="name_sm">{{item.main}}</el-col>
      <el-col :span="24"
              class="information_xs"
              :class="{active:item.status&&str.status||str.statusFlag}"
              v-for="(str,i) in item.timeList"
              :key="str.key"><span @click="toggle(navList,str,i,item.key)">{{str.menuName}}</span>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    asyncData() {
      return {
        list: [
          {
            main: '我的账户',
            timeList: [
              {
                name: '账户主页',
                key: 'account'
              },
              {
                name: '消息中心',
                key: 'center'
              }
            ]
          },
          {
            main: '设置',
            timeList: [
              {
                name: '账户设置',
                key: 'setUp'
              },
              {
                name: '登入密码',
                key: 'pass'
              }
            ]
          },
          {
            main: '社区',
            timeList: [
              {
                name: '我的主题',
                key: 'theme'
              },
              {
                name: '我的回复',
                key: 'reply'
              },
              {
                name: '我的收藏',
                key: 'collection'
              }
            ]
          }
        ]
      }
    },
    props: ['navList'],
    methods: {
      toggle(n, e, i, key) {
        this.$emit('toggle', {
          navList: n,
          str: e,
          index: i,
          key: key
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation {
    width: 100%;
    .nav_child {
      width: 100%;
      border-bottom: 1px solid #d3d3d3;
      &:last-child {
        border-bottom: none;
      }
      .name_sm {
        line-height: 40px;
        padding: 0 20px 0 40px;
      }
      .information_xs {
        width: 100%;
        cursor: pointer;
        span {
          width: 100%;
          line-height: 40px;
          display: inline-block;
          padding: 0 20px 0 40px;
        }
        &.active {
          background: #2678e4;
          color: #fff;
        }
        &:hover {
          background: #2678e4;
          color: #fff;
        }
      }
    }
  }

</style>
