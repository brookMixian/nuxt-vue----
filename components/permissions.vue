<template>
  <section class="permissions">
    <table>
      <thead>
      <tr class="trHeader">
        <th>用户名</th>
        <th>手机号</th>
        <th>角色</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in tableData.data" :key="item.uid">
        <td>{{item.nickName}}</td>
        <td>{{item.mobile}}</td>
        <td>
          <el-select v-model="item.roleId" placeholder="请选择" :disabled="item.roleNum==1000">
            <el-option
              v-for="str in options"
              :key="str.value"
              :label="str.label"
              :value="str.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-button type="primary" @click="authorization(item.uid,item.roleId,item.roleNum)" :disabled="item.roleNum==1000">确定授权</el-button>
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
    data() {
      return {
        value: '',
        options: [
          {
            label: '超级管理员',
            value: 1
          },
          {
            label: '业务管理员',
            value: 2
          },
          {
            label: '普通用户',
            value: 3
          }
        ]
      }
    },
    props: ['tableData'],
    methods: {
      authorization(uid, roleId, roleNum) {
        this.$emit('determineAuthor', {
          uid: uid,
          roleId: roleId,
          roleNum: roleNum
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .permissions {
    width: 90%;
    margin: 20px auto 0;
  }

</style>
