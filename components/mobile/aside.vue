<template>
  <div class="mobile-aside">
    <div class="user-head">
      <img src="~/static/images/logo.png" />
      <!-- <p>珍珠草工具大全</p> -->
        <p
          @click="toogleTheme"
          class="scoll-btn theme">
            <i
              class="iconfont"
              :class="{
                'icon-dark': theme === 'light',
                'icon-light': theme === 'dark'
              }"
            ></i>
          </p>
    </div>
      <nav>
        <li
        v-for="(list, index) in nav"
        :key="index"
        class="nav-list "
        >
          <nuxt-link
            :to="list.path"
            exact>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </li>
      </nav>
      <!-- <div class="aside-foot">
        <p class="mune">
          <nuxt-link to="/about">我</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/about">朋友</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/wall">留言墙</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/sitemap">归档</nuxt-link>
        </p>
      </div> -->
  </div>
</template>

<script>
export default {
  name: 'mobile-aside',
  data () {
    return {
      nav: [
        {
          path: '/',
          name: '二维码生成',
          icon: 'iconfont icon-home',
        },
        // { path: '/', name: '文章', icon: 'iconfont icon-read'},
        {
          path: '/encrypt/md5',
          name: '在线加密/在线解密',
          icon: 'iconfont icon-read',
          children: [
            { path: '/encrypt/md5', name: '在线md5加密' },
            { path: '/encrypt/base64', name: '在线base64加密' }
          ]
        },
        {
          path: '/image',
          name: '在线图片处理',
          icon: 'iconfont icon-read',
          children: [
            { path: '/image', name: '在线md5加密' },
            { path: '/base64', name: '在线base64加密' }
          ]
        },
        { path: '/front-end/htmlcode', name: 'HTML特殊字符编码对照表', icon: 'iconfont icon-read' }
      ],
      theme: 'light'
    }
  },

  computed: {
    user () {
      return this.$store.state.options.adminInfo
    }
  },

  methods: {
    toogleTheme () {
      const isLight = document.body.id === 'light'

      this.theme = isLight ? 'dark' : 'light'

      document.body.id = this.theme
      window.localStorage.setItem('THEME', this.theme)
    }
  },

  mounted () {
    this.theme = window.localStorage.getItem('THEME') || 'light'
  }
}
</script>

<style scoped lang="scss">


.mobile-aside {
  position: relative;
  height: 100%;

  >.user-head {
    padding: 2rem 1rem 1rem 1rem;
    text-align: center;

    >img {
      // border-radius: 50%;
      width: 10rem;
    }

    >p {
      margin-top: $mlg-pad;
      color: $black;
      font-size: 1.2rem;
    }


    .scoll-btn {
      display: block;
      margin-top: 2rem;
      text-align: center;
      line-height: 2rem;
      color: $black;
      cursor: pointer;

      i {
        font-size: $font-size-large;
      }
    }
  }
  > nav {
    margin-top: $mlg-pad;
    .nav-list {
      padding: 0.5rem;
      text-align: center;
    }
    a {
      margin-right: 0rem;
      padding: .5rem;
      color: $descript;

      i {
        margin-right: .8rem;
      }

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }

  > .aside-foot {
    position: absolute;
    bottom: $mlg-pad;
    left: 50%;
    width: 100%;
    font-size: $font-size-small;
    color: $disabled;
    text-align: center;
    transform: translate(-50%);
  }
}

</style>
