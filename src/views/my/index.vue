<template>
  <div class="my-container">
    <!-- 登录时显示的状态 -->
    <van-cell-group
    class="user-info"
    v-if="user"
    >
      <van-cell center class="user-base-info">
        <!-- 图片 -->
        <van-image
        class="user-avatar"
        slot="icon"
        round
        :src="currentUser.photo"
        />
        <!-- 用户名 -->
        <div
        class="user-name"
        slot="title"
        >{{currentUser.name}}</div>
        <!-- 按钮 -->
        <van-button
        slot="right-icon"
        type="default"
        size="small"
        round
        >编辑资料</van-button>
      </van-cell>
      <!-- 宫格 -->
      <van-grid
      class="user-data"
      center
      :border="false"
      >
        <van-grid-item>
          <div slot="text" class="data-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录时显示的 -->
    <van-cell-group
    class="user-info"
    v-else
    >
      <div class="not-login">
        <div @click="$router.push('/login')">
          <img class="mobile" src="./phone.png">
        </div>
        <div class="text">登录 / 注册</div>
      </div>
    </van-cell-group>
    <!-- 收藏/历史 -->
    <van-grid
    class="user-handle"
    :column-num="2"
    >
      <van-grid-item
      icon-prefix="toutiao"
      icon="shoucang"
      color="red"
      text="收藏" />
      <van-grid-item
      icon-prefix="toutiao"
      icon="lishi"
      text="历史" />
    </van-grid>
    <!-- 导航单元格 -->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
    <!-- 退出按钮 -->
    <van-cell
    v-if="user"
    @click="onlogout"
    title="退出登录"
    class="exitBtn" />
  </div>
</template>

<script>
import { getCurrentUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    if (this.user) {
      this.loadCurrentUser()
    }
  },
  methods: {
    async loadCurrentUser () {
      const res = await getCurrentUser()
      this.currentUser = res.data.data
    },
    onlogout () {
      // 退出操作
      this.$dialog.confirm({
        title: '提示',
        message: '确定退出吗'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.user-info {
  padding-top: 30px;
  height: 180px;
  background: url('./bg.jpg') no-repeat;
  background-size: cover;
  .user-base-info::after {
    border: none;
  }
  .van-cell {
    background-color: transparent;
    border: none;
    .user-avatar {
    box-sizing: border-box;
    border: 1px solid #fff;
    width: 66px;
    height: 66px;
    margin-right: 11px;
    }
    .user-name {
      color: #fff;
      font-size: 15px;
    }
  }
  .user-data {
    background-color: transparent;
    margin: 0 20px;
    .van-grid-item {
      background-color: transparent;
      /deep/ .van-grid-item__content {
        background-color: unset;
        .data-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            color: #fff;
            font-size: 20px;
          }
          .text {
            color: #fff;
            font-size: 11px;
          }
        }
      }
    }
  }
  // 未登陆时的样式
  .not-login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 80px;
    }
    .text {
      font-size: 18px;
    }
  }
}
.van-grid {
  margin-bottom: 10px;
  /deep/ .toutiao {
    font-size: 20px;
  }
  /deep/.toutiao-shoucang {
    color: red;
  }
  /deep/.toutiao-lishi {
    color: blue;
  }
}
.exitBtn {
  text-align:center;
  margin-top: 10px;
  color: red
}

</style>
