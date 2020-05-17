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
    <search-history v-else :search-history="searchHistory" />
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResults from './components/search-results'
import searchSuggestion from './components/search-suggestion'
import { getSearchHistory } from '@/api/search'
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
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        // 把重复的删除
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(searchText)
      setItem('search-histroy', this.searchHistory)
      this.isResultShow = true
    },
    async loadSearchHistory () {
      let searchHistory = getItem('search-histroy') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        searchHistory = [...new Set([...searchHistory, ...data.data.keywords])]
      }
      this.searchHistory = searchHistory
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
