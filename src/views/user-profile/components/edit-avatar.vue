<template>
  <div class="edit-avatar">
    <van-nav-bar
      class="navBar"
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEditPhoto"
    />
    <img :src="image" ref="image" class="image">
  </div>
</template>

<script>
import { editUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'EditName',
  props: {
    file: {
      // type: Object,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    // 初始化裁切工具
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    // 封装得到裁切头像的函数,并转成promise函数
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onEditPhoto () {
      this.$toast.loading({
        message: '更换中'
      })
      // 得到裁切的图像
      const file = await this.getCroppedCanvas()
      // 创建一个文件对象,并将裁切好的头像放进去
      const fd = new FormData()
      fd.append('photo', file)
      // 调用接口,将头像更新
      await editUserPhoto(fd)
      // 给父组件传数据,将裁切好的头像转成url格式传给父组件
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')
      this.$toast.success({
        message: '更换头像成功'
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__text {
  color: #fff;
}
.navBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
/* Ensure the size of the image fit the container perfectly */
.image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
