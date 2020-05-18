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
          :icon="article.is_followed ? '' : 'plus'"
          @click="isFollowUser"
        >{{article.is_followed ? '取消关注' : '关注'}}</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <van-button type="default">默认按钮</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { followUser, DelFollowUser } from '@/api/user'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
    },
    async isFollowUser () {
      // await followUser
      if (this.article.is_followed) {
        // 取消关注
        DelFollowUser(this.article.aut_id)
      } else {
        // 添加关注
        await followUser(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
    },
    onCollect () {},
    onLike () {}
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style scoped lang="less">
.article-wrap {
  padding: 10px;
  h3 {
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
}
</style>
