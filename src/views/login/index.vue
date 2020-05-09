<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入电话号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
          class="getCode"
          size="small"
          type="primary"
          round
          >获取验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 按钮 -->
    <div class="login-btn-box">
      <van-button
      class="login-btn"
      type="info"
      block
      :hairline="false"
      @click="userLogin"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async userLogin () {
      try {
        const res = await login(this.user)
        // 成功后
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.getCode {
  background-color: #ededed;
  border: none;
  color: #666;
}
.login-btn-box {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
