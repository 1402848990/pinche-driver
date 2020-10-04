export default {
  pages: [
    'pages/mine/index', // 我的
    'pages/index/index', // 首页
    'pages/infoSetting/index', // 用户信息设置
    'pages/payTypeList/index', // 添加支出类型
  ],
  // 配置下方导航栏
  tabBar: {
    'selectedColor':'#f4ea2a',
    list: [{
      "pagePath": "pages/index/index",
      "text": "首页",
      'iconPath':'./assets/icon/icon_index.png',
      'selectedIconPath':'./assets/icon/icon_index_selected.png'
    }, {
      "pagePath": "pages/mine/index",
      "text": "我的",
      'iconPath':'./assets/icon/icon_mine.png',
      'selectedIconPath':'./assets/icon/icon_mine_selected.png'
    }]
  },
  // 配置小程序窗口
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f4ea2a',
    navigationBarTitleText: '辅助大学生合理消费系统',
    navigationBarTextStyle: 'black'
  }
}
