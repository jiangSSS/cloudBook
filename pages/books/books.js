// pages/books/books.js
import { fetch } from "../../utils/util.js";
// const app = getApp();
Page({
  data: {
    titleId: "",
    article: {},
    title: "",
    bookId: [],
    catalog: [],
    isShow: false,
    isLoading: false,
    font: 40,
    index: ""
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },
  getData() {
    this.setData({
      isLoading: true,
      isShow: false
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      // let data = app.towxml.toJson(res.data.article.content, "markdown");
      this.setData({
        article: res.data.article.content,
        title: res.data.title,
        isLoading: false,
        index:res.data.article.index  
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalog: res.data
      })
    })
  },
  toggleCatalog() {
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  handleGet(event) {
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId: id
    })
    this.getData()
  },
  handleAdd() {
      this.setData({
        font: this.data.font + 3
      }) 
  },
  handleReduce() {
    if (this.data.font <= 26) {
      wx.showModal({
        title: '友情提示',
        content: '字体太小影响视力哦~',
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  handleNext(){
    let catalog = this.data.catalog;
    if(catalog[this.data.index +1]){
      this.setData({
        titleId:catalog[this.data.index +1]._id
      })
      this.getData();
    }else{
      wx.showToast({
        title: '恭喜看完本书',
      })
    }
    

  },
  handlePrev(){
    let catalog = this.data.catalog;
    if(this.data.index -1 <0){
            wx.showToast({
              title: '已经是第一章了',
            })
    }else{
      this.setData({
        titleId:catalog[this.data.index -1]._id
      })
      this.getData()
    }

  }
})   