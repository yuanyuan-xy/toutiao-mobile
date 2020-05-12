<template>
  <div class="home-container">
    <van-tabs v-model="active">
      <van-tab
      :key="item.id"
      v-for="item in channelsList"
      :title="item.name"
      >
      <article-list></article-list>
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

<style>

</style>
