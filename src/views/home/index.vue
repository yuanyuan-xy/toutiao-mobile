<template>
  <div class="home-container">
    <!-- 单元格 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active">
      <van-tab
      :key="item.id"
      v-for="item in channelsList"
      :title="item.name"
      >
      <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" class="wap-nav-warp">
        <van-icon name="wap-nav" @click="isPopupShow = true" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
    v-model="isPopupShow"
    position="bottom"
    class="popupStyle"
    closeable
    close-icon-position="top-left"
    get-container="body"
    >
    <channel-edit
    :channels="channelsList"
    :activeChannels="active"
    @close-popup="isPopupShow = false"
    @switch-channel="active = $event"
    ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/article-list'
// 引入弹出层的内容组件
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelsList: [],
      isPopupShow: true // 弹出层
    }
  },
  methods: {
    async getUserChannels () {
      let channels = []
      // 如果登陆了,就从接口获取数据
      if (this.user) {
        const res = await getChannels()
        channels = res.data.data.channels
      } else {
        // 如果没有登陆
        const localStorageChannels = getItem('nologin-channels')
        // 本地存储有记录,就把本地存储的数据赋值给频道列表
        if (localStorageChannels) {
          channels = localStorageChannels
        } else {
          // 本地存储没有记录,就把本地存储的数据赋值给频道列表
          const res = await getChannels()
          channels = res.data.data.channels
        }
      }
      this.channelsList = channels
    }
  },
  created () {
    this.getUserChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-tab {
    height: 41px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  /deep/ .van-tabs__line {
    width: 25px !important;
    bottom: 20px;
    background-color: #3196fa;
  }
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .wap-nav-warp {
    position: fixed;
    height: 40px;
    width: 30px;
    top: 44px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      bottom: 0;
      top: 0;
      left: -1px;
      background: url('./line.png');
    }
  }
  .wap-nav-placeholder {
    width: 30px;
    height: 40px;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }
}
.popupStyle {
  height: 100%;
}
</style>
