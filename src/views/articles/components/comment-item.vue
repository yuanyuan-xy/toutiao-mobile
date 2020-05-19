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
          <div class="like-warp">
            <van-icon name="good-job-o" />
            <span class="like-count">{{comment.like_count}}</span>
          </div>
        </div>
        <div class="comment-content">{{comment.content}}</div>
      </div>
      <div slot="label">
        <span class="pubdate">{{comment.pubdate | dateTime('MM-DD HH:mm')}}</span>
        <van-button type="default" round size="mini">{{comment.reply_count}}回复</van-button>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  name: 'CommentItem'
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
