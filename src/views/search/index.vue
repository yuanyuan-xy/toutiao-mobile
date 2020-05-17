<template>
  <div class="searchContainer">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="onFocus"
      />
    </form>
    <!-- FIXME:搜索结果 -->
    <search-results v-if="isResultShow" :search-text="searchText" />
    <!-- FIXME:搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />
    <!-- FIXME:搜索历史 -->
    <search-history v-else />
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResults from './components/search-results'
import searchSuggestion from './components/search-suggestion'
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
      isResultShow: false
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    },
    onFocus () {
      this.isResultShow = false
    }
  }
}
</script>

<style>

</style>
