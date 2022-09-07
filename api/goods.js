import fly from '@/utils/request.js'

export const getgoodslist = (data) => fly.get('/goods/search', data)
