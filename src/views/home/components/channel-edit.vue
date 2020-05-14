<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title">我的频道</div>
      <div slot="label">
        <van-grid>
          <van-grid-item
          class="channelBox"
          v-for="(channel, index) in channels"
          :key="index"
          :text="channel.name" />
        </van-grid>
      </div>
    </van-cell>
    <!-- 推荐频道 -->
    <van-cell>
      <div slot="title">推荐频道</div>
      <div slot="label">
        <van-grid>
          <van-grid-item
          v-for="(channel, index) in recommendChannels"
          :key="index"
          :text="channel.name" />
        </van-grid>
      </div>
    </van-cell>
  </div>
</template>

<script>
// 引入获得全部频道的接口
import { getAllChannels } from '@/api/channels'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      userAllChannels: []
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  methods: {
    async getUserAllChannels () {
      const { data } = await getAllChannels()
      this.userAllChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels () {
      return this.userAllChannels.filter(channel => {
        return !this.channels.find(item => {
          return item.id === channel.id
        })
      })
    }
  },
  created () {
    this.getUserAllChannels()
  }
}
</script>

<style scoped lang="less">
.channelEdit {
  padding-top: 50px;
  .channelBox {
    width: 80px;
    height: 43px;
  }
}
</style>
