<template>
  <div class="edit-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="name-message">
      <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
    />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '修改中',
        forbidclick: true
      })
      try {
        await editUserProfile({ name: this.message })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast.success({
          message: '修改成功'
        })
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail({
            message: '用户名已存在'
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__text {
  color: #fff;
}
.name-message {
  padding: 10px;
}
</style>
