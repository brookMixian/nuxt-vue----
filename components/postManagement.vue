<template>
  <section class="management">
    <table>
      <thead>
      <tr class="trHeader">
        <th>帖子标题</th>
        <th>作者</th>
        <th>所属目录</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in tableData.data" :key="item.uid">
        <td class="tdTitle">{{item.postTitle}}</td>
        <td>{{item.nickName}}</td>
        <td>
          <el-select v-model="item.menuId" placeholder="请选择">
            <el-option
              v-for="str in tableData.options"
              :key="str.menuId"
              :label="str.menuName"
              :value="str.menuId">
            </el-option>
          </el-select>
        </td>
        <td>
          {{stateToggle(item.statusCd)}}
        </td>
        <td>
          <el-select v-model="item.createTimeStr" placeholder="请选择" @change="handChange($event,item)">
            <el-option
              v-for="str in options"
              :key="str.menuId"
              :label="str.label"
              :value="str.menuId">
            </el-option>
          </el-select>
        </td>
      </tr>

      </tbody>

    </table>

  </section>

</template>

<script>
  export default {
    props: ['tableData'],
    data() {
      return {
        options: [
          {
            label: '帖子加精',
            menuId: 1
          },
          {
            label: '修改帖子',
            menuId: 2
          },
          {
            label: '删除帖子',
            menuId: 3
          },
          {
            label: '恢复帖子',
            menuId: 4
          }
        ]
      }
    },
    methods: {
      handChange(e, item) {
        this.$emit('handChange', {
          event: e,
          obj: item
        })
      },
      stateToggle(e) {
        switch (e) {
          case '0': {
            return '有效'
          }
          default: {
            return '失效'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .management {
    width: 90%;
    margin: 20px auto 0;
  }

  .el-select {
    width: 130px;
  }

</style>
