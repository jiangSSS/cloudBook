
const baseUrl = "https://m.yaojunrong.com";
const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync("token")
      let header = {
        "content-type": "application/json"
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          console.log(res)
          if (res.header.token || res.header.Token) {
            wx.setStorageSync("token", res.header.token)
          }
          resolve(res.data)
        },
        fail(err) {  
          reject(err)
        },
      })
    })
  },
  get(url, data) {
    return this.http(url, "GET", data)
  },
  post(url, data) {
    return this.http(url, "POST", data)
  },
}
const login = () => {
  wx.login({
    success(res) {
      fetch.post("/login", {
        code: res.code,
        appid: "wxa75f8e118fd31f58",
        secret: "bd1a47c4adbc9ca750c0e83dea0f1645",
      }).then(res => {
        console.log(res)
      })
    }
  })
}
exports.login = login;
exports.fetch = fetch;