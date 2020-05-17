<template>
  <div
    class="image-page"
    :class="{'mobile': mobileLayout}"
  >
    <div class="title">
      <span class="title-name">在线图片转base64</span>
    </div>
    <div class="main-content">
      <!-- element-ui 图片上传组件 -->
      <div class="thumbnail">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt=""
        >
        <!-- <el-link type="success">删除图片</el-link> -->
        <el-button
          type="info"
          class="delete-btn"
          icon="el-icon-delete"
          v-if="previewUrl"
          @click="handleRemove()"
        >点击删除</el-button>
        <!-- <div style="position:absolute;left:50%;top:50%">
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove()"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div> -->
      </div>
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="1"
        :on-change="afterUpload"
        v-if="!base64Url"
      >
        <i
          slot="default"
          class="el-icon-plus"
        ></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img
          width="100%"
          :src="dialogImageUrl"
          alt=""
        >
      </el-dialog>

      <div class="qrcode-result">
        <!-- <span v-if="!base64Url">生成区域</span> -->
        <div id="output">
          {{base64Url || ''}}
        </div>
        <!-- <a
          v-if="!!base64Url"
          class="submit-btn copy_btn"
          data-clipboard-target="#output"
        >点击复制到剪切板</a> -->
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { makeQRSrc } from '~/utils/qrcode'
// import Clipboard from 'clipboard';
export default {

  name: 'qrocde',

  transition: 'fade',

  head: {
    title: '在线图片转base64'
  },

  mounted () {
    //init
    // var clipboard = new Clipboard('.copy_btn');
    // //优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
    // clipboard.on('success', function (e) {
    //   alert('复制成功!')
    //   e.clearSelection();
    // });
    // clipboard.on('error', function (e) {
    //   alert('请选择“拷贝”进行复制!')
    // });
  },

  data () {
    return {
      showBox: false,
      qrcodeImageSrc: null,
      inputVal: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      base64Url: null,
      uploadedFile: null,
      previewUrl: null
    }
  },
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },
  methods: {
    submit () {
      if (!this.inputVal) return
      this.qrcodeImageSrc = makeQRSrc(this.inputVal)
    },
    handleRemove (file) {
      this.previewUrl = null
      this.base64Url = null
    },
    handlePictureCardPreview (url) {
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
      console.log('response', response)
      this.previewUrl = response.url || ''
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
      }
    }
  }
}

</script>

<style lang="scss">
.image-page {
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
    .thumbnail {
      width: 10rem;
      height: 10rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      .delete-btn {
        position: absolute;
        left: 50%;
        // top: 50%;
        bottom: -50px;
        transform: translateX(-50%);
        // display: none;
      }
    }
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
