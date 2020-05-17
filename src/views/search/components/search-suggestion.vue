<template>
  <div class="searchSuggestions">
     <van-cell
      v-for="(item, index) in suggestionsList"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
     >
     <div slot="title" v-html="activeSuggestions(item)"></div>
     </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 导入防抖的插件
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'SearchSuggestions',
  data () {
    return {
      suggestionsList: [] // 建议列表
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestionsList = data.data.options
      }, 300),
      // 不会等到组件没渲染的时候才触发
      immediate: true
    }
  },
  methods: {
    activeSuggestions (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
