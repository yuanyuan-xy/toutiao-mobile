import request from '@/utils/request'

// 获得搜索建议
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获得搜索结果
export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 获得搜索历史
export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

// 删除搜索历史
export const delSearchHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
