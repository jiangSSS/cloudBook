
Page({
  data: { 
  
    readData:"",

  },

  onLoad () {
    this.getReadList()
  
  },
  getReadList(){
    fetch.get("/readList").then(res=>{
      this.setData({
        readData:res.data
      })
    })
  },

})