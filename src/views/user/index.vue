<template>
  <div class="user-container">
    <van-nav-bar
      :title="user.name"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="content">
      <van-cell center>
        <van-image
        slot="icon"
        round
        width="80"
        height="80"
        :src="user.photo" />
        <!-- 用户个人资料 -->
        <div slot="title" class="user-data">
          <div class="user-data-item">
            <span>{{user.art_count}}</span>
            <span>发布</span>
          </div>
          <div class="user-data-item">
            <span>{{user.follow_count}}</span>
            <span>关注</span>
          </div>
          <div class="user-data-item">
            <span>{{user.fans_count}}</span>
            <span>粉丝</span>
          </div>
          <div class="user-data-item">
            <span>{{user.like_count}}</span>
            <span>获赞</span>
          </div>
        </div>
        <!-- /用户个人资料 -->
        <!-- 按钮 -->
        <div slot="label" class="btn-warp">
          <van-button type="primary">私信</van-button>
          <van-button
          :type="user.is_following? 'default' : 'danger'"
          >{{user.is_following? '√已关注' : '+关注'}}</van-button>
        </div>
      </van-cell>
      <van-cell>
        <span slot="icon">简介:</span>
        <span slot="title">&nbsp;&nbsp;&nbsp;{{user.intro}}</span>
      </van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadArticles"
      >
        <article-item
        v-for="(item, index) in articleList"
        :key="index"
        :article='item'
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getUserArticles } from '@/api/article'
import articleItem from '@/components/article-item'
export default {
  name: 'UserIndex',
  components: {
    articleItem
  },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      user: {},
      page: 1,
      articleList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getTheUserInfo () {
      const { data } = await getUserInfo(this.userId)
      this.user = data.data
    },
    async loadArticles () {
      const { data } = await getUserArticles(this.userId, {
        page: this.page,
        per_page: 10
      })
      this.articleList.push(...data.data.results)
      this.loading = false
      if (data.data.results) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  created () {
    this.getTheUserInfo()
    this.loadArticles()
  }
}
</script>

<style scoped lang="less">
.user-data {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .user-data-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.btn-warp {
  display: flex;
  justify-content: space-around;
  .van-button {
    width: 113px;
    height: 30px;
  }
}
.content {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
