<template>
  <div class="articleListContainer">
    <!-- 下拉刷新成功的语句为,在刷新成功后显示
    :success-text="refreshSuccessText"
    -->
    <van-pull-refresh
    v-model="isRefreshLoading"
    :success-duration="1000"
    :head-height="100 "
    @refresh="onRefresh"
    >
      <template #pulling="props">
        <img
          class="doge"
          src="./01.jpg"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <template slot="loosing">
        <img class="doge" src="./01.jpg" />
      </template>

      <!-- 加载提示 -->
      <template slot="loading">
        <img class="doge" src="./02.jpg" />
      </template>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
        v-for="(item, index) in articleList"
        :key="index"
        :article='item'
        />
        <!-- <van-cell
        v-for="(item, index) in articleList"
        :key="index"
        :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'
export default {
  name: 'ArticleListIndex',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      loading: false, // 下滑加载的loading
      finished: false, // 加载状态的结束
      articleList: [], // 数据列表
      timestamp: null, // 时间戳
      isRefreshLoading: false, // 上拉加载的loading
      refreshSuccessText: '' // 上拉加载成功的提示语句
    }
  },
  methods: {
    async onLoad () {
      // 下滑加载
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      // 将得到的数组加到列表数组的后面
      this.articleList.push(...results)
      this.loading = false
      // 如果得到的数据数组的长度为0,则说明没有数据了
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articleList.unshift(...results)
      this.isRefreshLoading = false

      // 成功提示文案
      // this.refreshSuccessText = `更新了${results.length}条数据`
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style scoped lang="less">
.articleListContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
.doge {
  width: 140px;
  height: 90px;
  margin-top: 8px;
  border-radius: 4px;
}
/deep/ .van-pull-refresh__head {
  font-size: 20px;
  color: #fff;
  line-height: 100px;
  background-color: #e84393;
}
</style>
