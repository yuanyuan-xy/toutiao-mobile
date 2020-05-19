<template>
  <div class="comment-item">
    <van-cell>
      <van-image
      slot="icon"
      class="user-avatar"
      round
      :src="comment.aut_photo"
      />
      <div slot="title">
        <div class="title-warp">
          <span class="user-name">{{comment.aut_name}}</span>
          <div class="like-warp" @click="onLikeCilck">
            <van-icon
            :name="comment.is_liking ? 'good-job': 'good-job-o'"
            :class="{'like-icon': comment.is_liking}"
            />
            <span class="like-count">{{comment.like_count}}</span>
          </div>
        </div>
        <div class="comment-content">{{comment.content}}</div>
      </div>
      <div slot="label">
        <span class="pubdate">{{comment.pubdate | dateTime('MM-DD HH:mm')}}</span>
        <van-button
        type="default"
        round
        size="mini"
        @click="$emit('showReplyPopup', comment)"
        >{{comment.reply_count}}回复</van-button>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { likeComment, delLikeComment } from '@/api/comment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  name: 'CommentItem',
  methods: {
    async onLikeCilck () {
      if (this.comment.is_liking) {
        await delLikeComment(this.comment.com_id)
        this.comment.like_count--
      } else {
        await likeComment(this.comment.com_id)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.user-avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.title-warp {
  display: flex;
  justify-content: space-between;
  .user-name {
    font-size: 15px;
    color: #466b9d;
  }
  .like-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    .like-icon {
      color: red;
    }
  }
}
.comment-content {
  font-size: 16px;
}
.pubdate {
  font-size: 12px;
  margin-right: 10px;
}
</style>
