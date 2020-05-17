<template>
  <div
    class="qrcode-page"
    :class="{'mobile': mobileLayout}"
  >
    <div class="title">
      <span class="title-name">在线文本生成二维码</span>
    </div>
    <div class="main-content">
      <div class="main-text">
        <textarea
          id="text-content"
          name="text"
          placeholder="请输入文字内容"
          v-model="inputVal"
        ></textarea>
        <button
          class="submit-btn"
          @click="makeQrcode"
        >点击生成二维码
        </button>
      </div>
      <div class="qrcode-result">
        <span v-if="!qrcodeImageSrc">二位码生成区域</span>
        <img
          v-if="qrcodeImageSrc"
          :src="qrcodeImageSrc"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { makeQRSrc } from '~/utils/qrcode'

export default {

  name: 'qrocde',

  transition: 'fade',

  head: {
    title: '在线二维码生成'
  },

  data () {
    return {
      showBox: false,
      qrcodeImageSrc: null,
      inputVal: ''
    }
  },
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },
  methods: {
    makeQrcode () {
      if (!this.inputVal) return
      this.qrcodeImageSrc = makeQRSrc(this.inputVal)
    }
  }
}

</script>

<style lang="scss">
.qrcode-page {
  width: $container-min-width;
  margin: 0 auto;

  .title {
    position: relative;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;
    }

    > .line {
      top: 50%;
    }
  }

  .title.more {
    margin-top: 2rem;
  }

  .title-mobile {
    margin-top: 0;
  }

  .main-text {
    flex: 1;
    outline: 0;
    height: 15rem;
    resize: none;
    font-size: 16px;
    padding: 24px;
    border: 0 none;
    padding-bottom: 18px;
    padding-top: 18px;
    box-shadow: 0 4px 6px 0 rgba(80, 80, 80, 0.14);
    margin-bottom: 5rem;
    position: relative;
    textarea {
      outline: 0;
      resize: none;
      width: 100%;
      height: 100%;
    }
  }
  .submit-btn {
    background: green;
    color: #fff;
    border: none;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -60px;
  }

  .main-content {
    display: flex;
    height: 15rem;
  }

  &.mobile .main-content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 110px;
    .main-text {
      width: 100%;
    }
    .qrcode-result {
      margin-left: 0;
      margin-top: 7rem;
    }
  }

  .qrcode-result {
    background: #ececec;
    margin-left: 50px;
    width: 15rem;
    height: 15rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    box-shadow: 0 4px 6px 0 rgba(80, 80, 80, 0.14);
    min-height: 2rem;
  }

  .qrcode-result img {
    // width: 100%;
    // height: 100%;
    width: 15rem;
    height: 15rem;
  }

  .last {
    padding: 2rem;
    border: 0;

    p {
      margin: 0.5rem 0;
    }

    a {
      text-decoration: underline;
    }
  }

  .friend {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 1rem 2rem;

    a {
      width: 30%;
      height: 3rem;
      margin-bottom: 1rem;
      margin-right: 5%;
      line-height: 3rem;
      text-align: center;
      background: $code-bg;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .info-box {
    display: flex;
    justify-content: space-between;

    > .info {
      position: relative;
      width: calc(100% - 16rem - 1rem);
      padding: $normal-pad 0;

      > .list {
        display: flex;
        margin: 0.5rem;
        padding: 0 1.5rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }

        > .list-content {
          margin-left: 1rem;
        }

        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $text;
            @include transition(all 0.5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }
      }
    }

    > .user-box {
      width: 16rem;
      padding-right: 2rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(4px);
        }
      }
    }
  }

  > .comment {
    margin-top: 2rem;
  }

  &.mobile {
    width: 100%;
    transform: translate(0);

    > .info-box {
      // grid-template-columns: 100%;
      width: 100%;
      flex-direction: column-reverse;

      > .info {
        padding: 1rem;
        width: 100%;

        > .list {
          padding: 0;
          // grid-gap: 1rem;
          @include text-overflow();
        }
      }
      > .user-box {
        // grid-row: 1 / 2;
        width: 100%;
        padding-right: 0;

        > .user {
          padding: 1.5rem;
        }
      }
    }
    .text-box .text {
      padding: 1.5rem;
      flex-wrap: wrap;
      text-align: left;

      .right {
        display: none;
      }
    }
  }

  > .text-box {
    margin-top: 1rem;

    > .text {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem 2rem;
      line-height: 2rem;

      .left {
        text-align: center;
      }

      .right {
        width: 12rem;
        text-align: center;

        p {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
