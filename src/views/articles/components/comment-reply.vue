<template>
    <div class="comment-reply">
      <van-nav-bar
        title="3条回复"
      >
        <van-icon slot="left" name="cross" @click="$emit('close')" />
      </van-nav-bar>
      <comment-item
      :comment="comment"
      ></comment-item>
    </div>
</template>

<script>
import commentItem from './comment-item'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    commentItem
  }
}
</script>

<style>

</style>
