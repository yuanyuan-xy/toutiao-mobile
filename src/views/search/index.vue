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
      />
    </form>
    <!-- FIXME:搜索结果 -->
    <search-results v-if="isResultShow" />
    <!-- FIXME:搜索提示 -->
    <search-suggestion v-else-if="searchText" />
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
      console.log(11)
    }
  }
}
</script>

<style>

</style>
