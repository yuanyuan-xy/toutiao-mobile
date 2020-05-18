import request from '@/utils/request'

// 登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取验证码
export const getSes = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取频道
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const DelFollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
