<template>
  <div
    class="md5"
    :class="{'mobile': mobileLayout}"
  >
    <div class="title">
      <span class="title-name">在线MD5加密</span>
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
        >点击进行加密</button>
      </div>

      <div class="common-result">
        <!-- <span v-if="!qrcodeImageSrc">二位码生成区域</span> -->
        <div>{{result}}</div>
        <div>{{resultUpcase}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
export default {

  name: 'md5',

  transition: 'fade',

  head: {
    title: '在线md5加密/解密'
  },

  data () {
    return {
      showBox: false,
      result: null,
      resultUpcase: null,
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
      // this.result = CryptoJS.Base64(this.inputVal).toString()
      this.result = CryptoJS.MD5(this.inputVal).toString()
      this.resultUpcase = this.result.toUpperCase()
    }
  }
}

</script>

<style lang="scss">
.md5 {
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
    height: 260px;
    resize: none;
    font-size: 16px;
    padding: 24px;
    border: 0 none;
    padding-bottom: 18px;
    padding-top: 18px;
    // background: #ececec;
    box-shadow: 0 4px 6px 0 rgba(80, 80, 80, 0.14);
    width: 100%;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .common-result {
    background: #ececec;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    box-shadow: 0 4px 6px 0 rgba(80, 80, 80, 0.14);
    width: 100%;
    flex-direction: column;
    padding: 1rem 0;
    min-height: 2rem;
  }

  .common-result img {
    width: 100%;
    height: 100%;
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
