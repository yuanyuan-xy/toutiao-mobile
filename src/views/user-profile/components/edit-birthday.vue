<template>
  <div class="edit-birthday">
    <!-- <van-nav-bar
      title="修改生日"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    /> -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onEditBirthday"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onEditBirthday () {
      this.$toast.loading({
        message: '修改中'
      })
      // 因为 this.currentDate是一个时间日期对象,所以不能直接给aoi传
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await editUserProfile({
        birthday: date
      })
      this.$emit('input', date)
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
