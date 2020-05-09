<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form
    validate-first
    >
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入电话号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="rules.code"
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
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17612216832',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' },
          {
            pattern: /^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'onBlur' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确',
            trigger: 'onBlur'
          }
        ]
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
        localStorage.setItem('user', res.data.data)
        // 消息通知
        this.$toast.success('登陆成功')
        this.$router.push('/')
      } catch {
        this.$toast.fail('登录失败')
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
