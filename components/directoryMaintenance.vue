<template>
  <section class="directory">
    <table>
      <thead>
      <tr class="trHeader">
        <th>子目录名称</th>
        <th>已有帖子</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in directoryObj.data" :key="item.menuId">
        <td>{{item.menuName}}</td>
        <td>{{item.postCount}}</td>
        <td>
          <el-button type="primary" @click="modify(item.menuId,item.menuName)">修改</el-button>
          <el-button @click="deleted(item)">删除</el-button>
        </td>
      </tr>

      </tbody>

    </table>

  </section>

</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    props: ['directoryObj'],
    methods: {
      modify(id, name) {
        this.$emit('modify', {
          menuId: id,
          menuName: name
        })
      },
      deleted(item) {
        this.$emit('deleted', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .directory {
    width: 90%;
    margin: 20px auto 0;
  }

</style>
