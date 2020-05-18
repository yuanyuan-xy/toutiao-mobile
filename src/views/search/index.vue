<template>
  <div class="searchContainer">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- FIXME:搜索结果 -->
    <search-results v-if="isResultShow" :search-text="searchText" />
    <!-- FIXME:搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- FIXME:搜索历史 -->
    <search-history
    v-else
    :search-history="searchHistory"
    @search="onSearch"
    @delHistory="delHistory"
    @delAllSearchHistory="delAllSearchHistory"
    />
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResults from './components/search-results'
import searchSuggestion from './components/search-suggestion'
import { getSearchHistory, delSearchHistory } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    searchHistory,
    searchResults,
    searchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: []
    }
  },
  created () {
    this.loadSearchHistory()
  },
  methods: {
    // 点击回车或搜索
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        // 把重复的删除
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(searchText)
      setItem('search-history', this.searchHistory)
      this.isResultShow = true
    },
    // 获得搜索历史
    async loadSearchHistory () {
      let searchHistory = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        console.log(data.data.keywords)
        searchHistory = [...new Set([...searchHistory, ...data.data.keywords])]
      }
      this.searchHistory = searchHistory
    },
    // 删除历史记录
    async delHistory (index) {
      // TODO: 这里不太明白
      await delSearchHistory()
      this.searchHistory.splice(index, 1)
      setItem('search-history', this.searchHistory)
    },
    // 删除全部历史记录
    async delAllSearchHistory () {
      // TODO: 这里不太明白
      await delSearchHistory()
      this.searchHistory = []
      setItem('search-history', this.searchHistory)
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
