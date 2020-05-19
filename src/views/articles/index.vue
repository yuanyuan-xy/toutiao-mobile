<template>
  <div class="articleContainer">
    <!-- 页头标题 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 文章内容 -->
    <div class="article-wrap">
      <h3>{{article.title}}</h3>
      <van-cell center class="user-info">
        <!-- 左侧头像 -->
        <van-image
        slot="icon"
        class="user-avatar"
        round
        :src="article.aut_photo"
        ></van-image>
        <!-- 作者姓名 -->
        <div slot="title" class="user-name">{{article.aut_name}}</div>
        <!-- 时间 -->
        <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
        <!-- 关注按钮 -->
        <van-button
          slot="default"
          size="small"
          :type="article.is_followed ? 'default' : 'info'"
          round
          :loading="isFollowLoading"
          :icon="article.is_followed ? '' : 'plus'"
          @click="isFollowUser"
        >{{article.is_followed ? '取消关注' : '关注'}}</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div
      class="article-content"
      ref="article-content"
      v-html="article.content"></div>
      <article-comment
      :source="articleId"
      :commentList="commentList"
      @totalCount="totalCount=$event"
      @showReplyPopup="replyClick"
      ></article-comment>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <van-button
      type="primary"
      round
      class="comment-btn"
      @click="isPostComShow=true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="totalCount"
        color="#777"
      />
      <van-button
      :icon="article.is_collected ? 'star' : 'star-o'"
      type="default"
      :loading="isCollectedLoaing"
      @click="onCollect"
      class="collect-btn"
      />
      <van-button
      :icon="article.attitude === 1 ? 'good-job' : 'good-job-o'"
      @click="onLike"
      :loading="isLikeLoading"
      class="like-btn"
      ></van-button>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 发表评论弹出层 -->
    <van-popup
    v-model="isPostComShow"
     position="bottom"
    >
    <post-comment
    :target="articleId"
    @post-success="postSuccess"
    />
    </van-popup>
    <!-- 评论回复弹出层 -->
    <van-popup
     v-model="isReplyShow"
     position="bottom"
    >
    <comment-reply
    @close="isReplyShow=false"
    :comment="currentComment"
    ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById, collectArticle, delCollectArticle, delLikeArticle, likeArticle } from '@/api/article'
import { followUser, delFollowUser } from '@/api/user'
import { ImagePreview } from 'vant'
import articleComment from './components/article-comment'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    articleComment,
    postComment,
    commentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isCollectedLoaing: false,
      isLikeLoading: false,
      isPostComShow: false, // 发表评论弹出层是否开启
      commentList: [],
      totalCount: 0,
      isReplyShow: false, // 评论回复弹出层
      currentComment: {}
    }
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.loadPrevImg()
      })
    },
    loadPrevImg () {
      const content = this.$refs['article-content']
      const imgs = content.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 在事件处理函数中调用 ImagePreview() 预览
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    async isFollowUser () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 取消关注
        await delFollowUser(this.article.aut_id)
      } else {
        // 添加关注
        await followUser(this.article.aut_id)
      }
      this.isFollowLoading = false
      this.article.is_followed = !this.article.is_followed
    },
    async onCollect () {
      this.isCollectedLoaing = true
      if (this.article.is_collected) {
        // 取消收藏
        await delCollectArticle(this.article.art_id)
      } else {
        // 添加收藏
        await collectArticle(this.article.art_id)
      }
      this.isCollectedLoaing = false
      this.$notify({
        type: 'success',
        message: `${this.article.is_collected ? '取消' : '添加'}收藏`,
        duration: 800
      })
      this.article.is_collected = !this.article.is_collected
    },
    async onLike () {
      this.isLikeLoading = true
      if (this.article.attitude === 1) {
        // 取消点赞
        await delLikeArticle(this.article.art_id)
        this.article.attitude = 0
      } else {
        // 点赞
        await likeArticle(this.article.art_id)
        this.article.attitude = 1
      }
      this.isLikeLoading = false
      this.$notify({
        type: 'success',
        message: `${this.article.attitude !== 1 ? '取消' : '添加'}赞同`,
        duration: 800
      })
    },
    postSuccess (newObj) {
      this.isPostComShow = false
      this.commentList.unshift(newObj)
      this.totalCount++
    },
    replyClick (comment) {
      this.currentComment = comment
      this.isReplyShow = true
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style scoped lang="less">
.article-wrap {
  padding: 10px;
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
  h3 {
    font-size: 20px;
    margin: 0;
  }
  .user-avatar {
    margin-right: 10px;
    /deep/ .van-image__img {
      width: 36px;
      height: 36px;
    }
  }
}
.article-content {
  background-color: #fff;
  margin: 0;
  overflow: hidden;
  padding: 10px;
}
.footer {
  height: 50px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .comment-btn {
    width: 150px;
    height: 35px;
  }
  .collect-btn {
    font-size: 20px;
    border: none;
    width: 40px;
    color: red;
    padding: 0;
  }
  .like-btn {
    font-size: 20px;
    border: none;
    width: 40px;
    color: hotpink;
    padding: 0;
  }
}
</style>
