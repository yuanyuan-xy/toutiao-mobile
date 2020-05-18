<template>
  <div class="comment-container">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已展示全部评论"
      @load="onLoad"
    >
      <van-cell
      v-for="(item, index) in commentList"
      :key="index"
      :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
export default {
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  name: 'commentIndex',
  data () {
    return {
      commentList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data
      this.commentList.push(...results)

      this.loading = false

      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
