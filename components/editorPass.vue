<template>
  <section class="settings">
    <el-row>
      <el-col :span="24" class="information_xs pd_top_10">当前密码：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.currentPass" type="password"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">新密码：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.newPass" type="password" placeholder="新密码(6-20位,建议字母数字和符号的组合)"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">确认新密码：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.confirmPass" type="password" placeholder="确认新密码"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="text-right pd_top_20">
        <button class="btn text_xs" @click="$emit('update')">更新密码</button>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    props: ['settingsObj']
  }
</script>

<style lang="scss" scoped>
  .settings {
    width: 90%;
    margin: 0 auto;
  }
  .btn{
    width: 80px;
  }

</style>
