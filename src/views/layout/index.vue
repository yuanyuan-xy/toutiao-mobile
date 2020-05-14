<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" router>
      <van-tabbar-item icon-prefix="toutiao" icon="shouye" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">远远</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" icon="shipin" to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="wap-home-o" to="my">{{user ? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
