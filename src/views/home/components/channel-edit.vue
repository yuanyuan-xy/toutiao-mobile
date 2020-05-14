<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button
      type="info"
      plain
      size="mini"
      @click="isIconShow = !isIconShow"
      >{{isIconShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
      :icon="(isIconShow && index !== 0) ? 'clear' : ''"
      class="channelBox"
      :class="{active: activeChannels === index}"
      v-for="(channel, index) in channels"
      :key="index"
      :text="channel.name"
      @click="onLoadMyChannel(channel,index)"
      />
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell>
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
      v-for="(channel, index) in recommendChannels"
      :key="index"
      :text="channel.name"
      @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// 引入获得全部频道的接口
import { getAllChannels, addUserChannels, delUserChannels } from '@/api/channels'
// 引入vuex的user
import { mapState } from 'vuex'
// 引入本地数据操作的接口
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      userAllChannels: [], // 全部频道
      isIconShow: false
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeChannels: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getUserAllChannels () {
      const { data } = await getAllChannels()
      this.userAllChannels = data.data.channels
    },
    // 添加
    async addChannel (channel) {
      this.channels.push(channel)
      // TODO:数据持久化
      if (this.user) {
        console.log('保存服务器')
        await addUserChannels({
          channels: [{
            id: channel.id,
            seq: this.channels.length
          }]
        })
      } else {
        setItem('nologin-channel', this.channels)
      }
    },
    // 操作我的频道
    onLoadMyChannel (channel, index) {
      if (this.isIconShow && index !== 0) {
        // 这里是删除操作
        this.delChannel(channel, index)
      } else {
        // 这里是切换操作
        this.switchChannel(channel, index)
      }
    },
    // 删除
    async delChannel (channel, index) {
      if (this.activeChannels >= index) {
        this.$emit('switch-channel', this.activeChannels - 1)
      }
      this.channels.splice(index, 1)
      // TODO: 数据持久化
      if (this.user) {
        console.log('云端删除')
        await delUserChannels(channel.id)
      } else {
        setItem('nologin-channel', this.channels)
      }
    },
    // 切换
    switchChannel (channel, index) {
      this.$emit('switch-channel', index)
      this.$emit('close-popup')
    }
  },
  computed: {
    ...mapState(['user']),
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
  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
    }
  }
  /deep/ .van-grid-item__icon {
    position: absolute;
    top: -3px;
    right: -5px;
    font-size: 15px;
    color: red;
  }
  /deep/ .van-grid-item__text {
    margin-top: 0;
  }
  .active {
    /deep/ .van-grid-item__content {
      .van-grid-item__text {
        color: #fff;
      }
      background-color:red;
    }
  }
}
</style>
