import request from '@/utils/request'

// 对评论或评论回复点赞
export const likeComment = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消对评论或评论回复点赞
export const delLikeComment = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
