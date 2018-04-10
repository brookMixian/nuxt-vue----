<template>
  <!--弹框外壳组件-->
  <transition name="confirm">
    <div class="popupContainer" @click.self="$emit('emitClickPopup')">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
    export default{
        data () {
            return {}
        }
    }
</script>
<style lang="scss">
  .confirm-enter-active, .confirm-leave {
    transition: .3s all;
    opacity: 1;
    transform: scale(1);
  }

  .confirm-enter, .confirm-leave-active {
    opacity: 0;
    transition: .3s all;
    transform: scale(1.5);
  }

  .popupContainer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(49, 49, 49, 0.7);
  }
</style>
