<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods-detail/goods-detail?id=${item.goods_id}`" v-for="item in goods"
      :key="item.goods_id" :price="item.goods_price | toFixed" :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultPic" />
  </view>
</template>

<script>
  import {
    getgoodslist
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        querydata: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isloading: false
      }
    },
    methods: {
      async goodslist(cb) {
        this.isloading = true
        const {
          total,
          goods
        } = await getgoodslist(this.querydata)
        this.isloading = false
        this.total = total
        isloading: false
        this.goods = [...this.goods, ...goods]
        cb && cb()
      }
    },
    onPullDownRefresh() {
      this.querydata = {
        query: this.querydata.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goods = []
      this.total = 0
      this.goodslist(() => {
        uni.stopPullDownRefresh()
      })
    },
    onLoad({
      query
    }) {
      this.querydata.query = query
      this.goodslist()
    },
    onReachBottom() {
      if (this.querydata.pagenum * this.querydata.pagesize >= this.total) return toast('亲，没有更多数据了哟')
      if (this.isloading) return
      this.querydata.pagenum++
      this.goodslist()
    }
  }
</script>

<style lang="scss">

</style>
