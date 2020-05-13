<template>
  <div class="home-container">
    <!-- 单元格 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active">
      <van-tab
      :key="item.id"
      v-for="item in channelsList"
      :title="item.name"
      >
      <article-list :channel="item"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelsList: []
    }
  },
  methods: {
    async getUserChannels () {
      const res = await getChannels()
      this.channelsList = res.data.data.channels
    }
  },
  created () {
    this.getUserChannels()
  },
  components: {
    ArticleList
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
