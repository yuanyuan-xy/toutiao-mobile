<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form
    validate-first
    :show-error="false"
    :show-error-message="false"
    ref="login-form"
    @submit="userLogin"
    @failed="onFailed"
    >
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入电话号"
        name="mobile"
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
          <van-count-down
          v-if="showCountDown"
          :time="1000 * 60"
          format="ss s"
          @finish="showCountDown = false"
          />
          <van-button
          v-else
          class="getCode"
          size="small"
          type="primary"
          :loading="sendSesLoading"
          round
          @click.prevent="onSendSes"
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
      >登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSes } from '@/api/user.js'
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
      },
      showCountDown: false, // 倒计时显示
      sendSesLoading: false // 发送验证码loading
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async userLogin () {
      // loading效果
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        // 成功后
        // 消息通知
        this.$toast.success('登陆成功')
        this.$router.back()
        // 登陆成功后将token存入vuex中
        this.$store.commit('setUser', res.data.data)
      } catch {
        this.$toast.fail('登录失败')
      }
    },
    onFailed (error) {
      console.log(11)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSes () {
      try {
        // 验证手机号
        await this.$refs['login-form'].validate('mobile')
        // 展示loading效果
        this.sendSesLoading = true
        // 验证成功发送验证码
        await getSes(this.user.mobile)
        // 显示倒计时
        this.showCountDown = true
      } catch (err) {
        // 定义发送失败的提示信息
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送间隔为一分钟'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败,请稍后再试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论是白都将按钮得loading效果关闭
      this.sendSesLoading = false
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
