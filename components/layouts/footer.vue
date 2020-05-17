<template>
  <footer :class="{'mobile': mobileLayout}" class="">
    <div class="container">
      <p class="icp">
        <time>©{{new Date().getFullYear()}} 珍珠草工具大全</time>
        <span class="hr"></span>
        <a href="http://www.beian.miit.gov.cn" _target="_blank">豫ICP备15023667号-1</a>
        <span class="hr"></span>     
        <span>RSS</span>
      </p>
    </div>
  </footer>
</template>
<script>

export default {
  name: 'Mfooter',

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    option () {
      return this.$store.state.options.option
    }
  }
}

</script>

<style scoped lang="scss">
footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $white;
  border-top: 1px solid $border-color;
  color: $text;

  >.container {
    display: flex;
    justify-content: center;

    &.center {
      justify-content: center;
    }

    > ul,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    > .mune {
      padding: $normal-pad / 2 $normal-pad;
      border-top: 1px solid $border-color;
    }
  }

  &.mobile {
    display: none;
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>

