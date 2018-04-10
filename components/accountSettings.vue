<template>
  <section class="settings">
    <el-row>
      <el-col :span="24" class="information_xs pd_top_10">手机号：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.mobile" :disabled="true"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">昵称：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.nickName" :autofocus="true"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">职业：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.professional"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">学历：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.schooling"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">邮箱：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.email"></el-input>
      </el-col>
      <el-col :span="24" class="information_xs pd_top_20">联系地址：</el-col>
      <el-col :span="12" class="pd_top_5">
        <el-input v-model="settingsObj.address"></el-input>
      </el-col>
      <!--<el-col :span="24" class="information_xs pd_top_20">个人简介：</el-col>-->
      <!--<el-col :span="12" class="pd_top_5">-->
      <!--<el-input v-model="settingsObj.introduction"-->
      <!--placeholder="请输入内容"-->
      <!--type="textarea"-->
      <!--autosize></el-input>-->
      <!--</el-col>-->
    </el-row>
    <el-row>
      <el-col :span="12" class="text-right pd_top_20">
        <button class="btn text_xs" @click="$emit('save')">保存</button>
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

  .btn {
    width: 80px;
  }

</style>
