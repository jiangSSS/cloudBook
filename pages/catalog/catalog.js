import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookId: "",
    catalogData: [],
    isLoading:false,
  },
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  getData() {
    this.setData({
      isLoading:true,
    })
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalogData: res.data,
        isLoading:false,
      })
    }).catch(err =>{
      this.setData({
        isLoading:false,
      })
    })
  },
})












