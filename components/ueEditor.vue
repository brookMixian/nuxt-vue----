<template>
  <section class="editor">
    <script id="editor" type="text/plain"></script>
    <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect> <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect> </svg>
  </section>
</template>

<script>
  export default {
    name: 'UE',
    data() {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

<style lang="scss" scoped>

</style>
