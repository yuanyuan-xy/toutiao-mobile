<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    type="default"
    size="small"
    :disabled="!message"
    @click="onPostComment"
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPostComment () {
      this.$toast.loading({ message: '正在发布', forbidClick: true })
      const { data } = await postComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      this.$emit('post-success', data.data.new_obj)
      this.message = ''
      this.$toast({
        type: 'success',
        message: '发布成功'
      })
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
