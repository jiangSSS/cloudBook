import { fetch , login } from "../../utils/util.js";
const app = getApp();
Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    isLoading: false,
    pn: 1,
    hasMore: true,
  },
  onLoad: function () {
    // this.getData()
    // this.getContent()
    
    this.getAllData();
    login()
  },
  //获得轮播图
  getData(neadLoading = true) {
    return new Promise((resolve, reject) => {
      fetch.get("/swiper").then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
        })
      }).catch(err => {
        reject(reject)
      })
    })
  },
  //获得图书列表
  getContent() {
    return new Promise((resolve, reject) => {
      fetch.get("/category/books").then(res => {
        resolve()
        this.setData({
          mainContent: res.data,
        })
      })
    })
  },
  //获取全部数据
  getAllData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true,
      })
      Promise.all([this.getData(),this.getContent()]).then(() => {
        resolve()
        this.setData({
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    })
  },
  //获取更多图书
  getMoreContent() {
    return fetch.get("/category/books", {
      pn: this.data.pn
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getAllData().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  //上拉加载
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      console.log(this.data.pn)
      this.getMoreContent().then(res => {
        let newArr = [...this.data.mainContent, ...res.data];
        this.setData({
          mainContent: newArr
        })
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  },
  //跳转详情页面
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  jumpStudy(){
    wx.navigateTo({
      url: `/pages/study/study`,
    })
  }


})
