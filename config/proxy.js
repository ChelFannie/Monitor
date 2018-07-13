var proxyTable = {
    '/api': {
      target: 'http://192.168.28.2:9734/',//设置你调用的接口域名和端口号
      // target: 'http://192.168.29.108:10003/',//设置你调用的接口域名和端口号
      // target: 'http://192.168.29.169:10003/', //设置你调用的接口域名和端口号
      // target: 'http://192.168.50.2:10003/',//设置你调用的接口域名和端口号
      // target: 'http://192.168.29.139:10003/',//设置你调用的接口域名和端口号
      authorization: false,
      changeOrigin: true,     //跨域
      pathRewrite: {
        '/api': '/'          //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22’即可
      }
    }
}
module.exports = proxyTable