<template>
  <div class="my-container">
    <van-cell-group class="user-info">
      <van-cell center>
        <!-- 图片 -->
        <van-image
        class="user-avatar"
        slot="icon"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <!-- 用户名 -->
        <div
        class="user-name"
        slot="title"
        >用户名</div>
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
          <div slot="text">
            <div class="span">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
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
    <!-- 按钮 -->
    <van-cell title="退出登录" style="text-align:center" class="exitBtn" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.user-info {
  padding-top: 30px;
  background: url('./bg.jpg') no-repeat;
  background-size: cover;
  .van-cell {
    background-color: transparent;
    border: none;
    .user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    }
    .user-name {
      color: #fff;
    }
  }
  .user-data {
    background-color: transparent;
    margin: 0 20px;
    .van-grid-item {
      background-color: transparent;
      .van-grid-item__content {
        background-color: none;
        .span {
          font-size: 20px;
        }
        .text {
          font-size: 20px;
        }
      }
    }
  }
}
.van-grid {
  margin-bottom: 10px;
}
.exitBtn {
  margin-top: 10px;
  color: red
}

</style>
