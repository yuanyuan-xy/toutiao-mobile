<template>
  <div class="searchResults">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadSearchResults"
    >
      <van-cell v-for="(item, index) in resultsList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultsList: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  created () {},
  methods: {
    async onLoadSearchResults () {
      const { data } = await getSearchResults({
        page: this.page,
        per_page: 10,
        q: this.searchText
      })
      this.resultsList.push(...data.data.results)
      // 3. 关闭本次的 loading
      this.loading = false
      // 4. 判断是否还有数据
      if (data.data.results.length) {
        // 如果有，则更新获取下一页数据的页码
        this.page++
      } else {
        // 如果没有，则把 finished 设置为 true，关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.searchResults {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
