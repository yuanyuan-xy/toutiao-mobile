<template>
    <div class="comment-reply">
      <van-nav-bar
        :title="`${currentComment.reply_count}条回复`"
      >
        <van-icon slot="left" name="cross" @click="$emit('close')" />
      </van-nav-bar>
      <!-- 当前评论 -->
      <comment-item
      :comment="currentComment"
      ></comment-item>
      <!-- 全部评论标题 -->
      <!-- <van-cell title="全部评论"></van-cell> -->
      <!-- 全部评论 -->
      <div class="allReply">
        <article-comment
        :source="currentComment.com_id"
        type="c"
        :commentList="commentList"
        ></article-comment>
      </div>
      <!-- 底部区域 -->
      <div class="replyFooter">
        <van-button
        type="primary"
        class="addReply"
        round
        @click="isReplyShow=true"
        >写评论</van-button>
      </div>
      <!-- 弹出层 -->
      <van-popup v-model="isReplyShow" position="bottom" >
        <post-comment
        :target="currentComment.com_id"
        :articleId="articleId"
        @post-success="onPostSuccess"
        ></post-comment>
      </van-popup>
    </div>
</template>

<script>
import commentItem from './comment-item'
import articleComment from './article-comment'
import postComment from './post-comment'
export default {
  name: 'CommentReply',
  props: {
    // 父组件传过来的当前评论
    currentComment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      commentList: [],
      isReplyShow: false
    }
  },
  methods: {
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.isReplyShow = false
      this.currentComment.reply_count++
    }
  },
  components: {
    commentItem,
    articleComment,
    postComment
  }
}
</script>

<style scoped lang="less">
.allReply {
  margin-bottom: 40px;
}
.replyFooter {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addReply {
  width: 250px;
  height: 35px;
}
</style>
