// pages/details/details.js
import { fetch } from "../../utils/util.js";
const app = getApp();

Page({
  data: {
    bookId: "",
    bookData: {},
    isLoading:false,
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId: options.id
    })
    this.getData()

  },
  getData() { 
    this.setData({
      isLoading:true,
    })
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        bookData: res,
        isLoading:false,
      })
    }).catch(err =>{
      this.setData({
        isLoading:false,
      })
    })
  },
  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  handleCollect(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功',
          type:"success",
          duration:1000
        })
        let bookData = {...this.data.bookData}
        bookData.isCollect = 1
        this.setData({
          bookData: bookData
        })
      }
      
    })
  },
  // 分享
  onShareAppMessage:function(){
    return {
      title: this.data.bookData.data.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }

})