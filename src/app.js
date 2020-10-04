import { Component } from 'react'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  componentWillMount(){

    // Taro.getUserInfo({}).then(res=>{
    //   console.log('res...',res)
    // })

    // Taro.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       Taro.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
