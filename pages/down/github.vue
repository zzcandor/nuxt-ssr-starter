<template>
  <div
    class="down-page"
    :class="{'mobile': mobileLayout}"
  >
    <div class="title">
      <span class="title-name">github客户端下载</span>
    </div>
    <div>
      <el-row
        :gutter="24"
        v-for="(item,index) in downListArray"
        :key="index"
        class="row"
      >
        <el-col
          :xs="6"
          :sm="6"
          :md="4"
          :lg="4"
          :xl="4"
          class="item"
        >
          <div class="grid-content bg-purple-light preview-box">
            <img
              :src="item.shortcutLink"
              :alt="item.name"
              class="preview"
              :width="mobileLayout ? 100 : 200"
            >
            {{ item.name }}
          </div>
        </el-col>
        <el-col
          :xs="8"
          :sm="8"
          :md="4"
          :lg="4"
          :xl="4"
          class="item"
        >
          <!-- <el-button>点击下载</el-button> -->
          <el-link
            type="success"
            :href="item.downLink"
            target="_blank"
          >点击下载</el-link>
        </el-col>
        <el-col
          :xs="6"
          :sm="6"
          :md="8"
          :lg="8"
          :xl="8"
          class="item"
        >
          <div class="grid-content bg-purple-light">
            扫码下载
            <img
              :src="item.qrcodeLink"
              alt=""
              class="qrcode"
              :width="mobileLayout ? 100 : 150"
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { makeQRSrc } from '~/utils/qrcode'
export default {
  name: 'github',
  transition: 'fade',
  head: {
    title: 'github客户端下载'
  },
  mounted () {
  },
  data () {
    return {
      showBox: false,
      qrcodeImageSrc: null,
      inputVal: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      base64Url: null
    }
  },
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },
    downListArray () {
      const shortCutMap = {
        PC: 'http://util.zzcit.com/down/github/icon/github-logo-pc.png',
        Mac: 'http://util.zzcit.com/down/github/icon/github-logo-pc.png',
        iPhone: 'http://util.zzcit.com/down/github/icon/github-logo-mobile.jpg',
        Android: 'http://util.zzcit.com/down/github/icon/github-logo-mobile.jpg'
      }
      const linkMap = {
        PC: 'http://util.zzcit.com/down/github/GitHubDesktopSetup.exe',
        Mac: 'http://util.zzcit.com/down/github/GitHubDesktopMac.zip',
        iPhone: 'https://apps.apple.com/us/app/github/id1477376905?ls=1',
        Android: 'http://util.zzcit.com/down/github/github_android.v1.0.0.apk'
      }
      return [
        { name: 'Android端', shortcutLink: shortCutMap['Android'], downLink: linkMap['Android'], action: 'down', qrcodeLink: makeQRSrc(linkMap['Android']) },
        { name: 'iPhone端', shortcutLink: shortCutMap['iPhone'], downLink: linkMap['iPhone'], action: 'jump', qrcodeLink: makeQRSrc(linkMap['iPhone']) },
        { name: 'PC端', shortcutLink: shortCutMap['PC'], downLink: linkMap['PC'], action: 'down', qrcodeLink: makeQRSrc(linkMap['PC']) },
        { name: 'Mac端', shortcutLink: shortCutMap['Mac'], downLink: linkMap['Mac'], action: 'down', qrcodeLink: makeQRSrc(linkMap['Mac']) }
      ]
    }
  },
  methods: {
    submit () {
      if (!this.inputVal) return
      this.qrcodeImageSrc = makeQRSrc(this.inputVal)
    },
    handleRemove (file) {
      console.log(file);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
      console.log(file);
    },
    blobToDataURL (blob, callback) {
      var a = new FileReader();
      a.onload = function (e) {
        console.log('e', e)
        callback(e.target.result);
      }
      a.readAsDataURL(blob);
    },
    // 处理图片
    afterUpload (response, files, fileList) {
      console.log('werwe', files)
      this.blobToDataURL(files[0].raw, (url) => {
        this.base64Url = url
      })
    },
    // image转Base64
    imageToBase64 (file, callback) {
      let self = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        a.onload = function (e) { callback(e.target.result); }
        a.readAsDataURL(blob);
        // reader.onloadend = function () {
        //   self.resValue = this.result;
        // }
      }
    }
  }
}

</script>

<style lang="scss">
.down-page {
  width: $container-min-width;
  margin: 0 auto;

  .preview-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

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
  }

  .row {
    margin-bottom: 30px;
    .item {
      display: flex;
      align-items: center;
      height: 10rem;
    }
  }

  .submit-btn {
    background: green;
    color: #fff;
    border: none;
    text-align: center;
    position: absolute;
    display: block;
    padding: 3px 5px;
    bottom: -50px;
    width: 150px;
    cursor: pointer;
  }

  .main-content {
    display: flex;
  }

  .preview {
    width: 5rem;
    height: 5rem;
  }

  .qrcode-result {
    background: #ececec;
    margin-left: 50px;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    box-shadow: 0 4px 6px 0 rgba(80, 80, 80, 0.14);
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 12px;
    max-height: 260px;
    position: relative;
    #output {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
  }

  .qrcode-result img {
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
