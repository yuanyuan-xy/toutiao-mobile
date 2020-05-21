<template>
  <div class="edit-gender">
    <van-nav-bar
      title="修改性别"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-picker
      :columns="columns"
      :default-index="defaultIndex"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    // picker 是组件实例
    // value 是选中的值
    // index 是选中的值得索引
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onClickRight () {
      this.$toast.loading({
        message: '修改中',
        forbidclick: true
      })
      await editUserProfile({ gender: this.defaultIndex })
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success({
        message: '修改成功'
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__text {
  color: #fff;
}
</style>
