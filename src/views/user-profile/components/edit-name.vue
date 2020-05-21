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
      maxlength="50"
      show-word-limit
    />
    </div>
  </div>
</template>

<script>
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
    onClickRight () {
      console.log(11)
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
