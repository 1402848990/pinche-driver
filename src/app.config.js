export default {
  pages: [
    "pages/info/add", // 发布行程
    "pages/mine/index", // 我的
    "pages/index/index", // 首页
    "pages/addAccount/index", // 记一笔
    "pages/myInfoSet/index", // 用户信息设置
    "pages/payTypeList/index", // 添加支出类型
    "pages/incomeTypeList/index", // 添加收入类型
    "pages/pushRecord/index", // 发布记录
    "pages/wallet/index", // 钱包

  ],
  // 配置下方导航栏
  tabBar: {
    borderStyle: "white",
    selectedColor: "#f4ea2a",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/icon/icon_index.png",
        selectedIconPath: "./assets/icon/icon_index_selected.png"
      },
      {
        pagePath: "pages/addAccount/index",
        text: "记一笔",
        iconPath: "./assets/icon/加号.png",
        selectedIconPath: "./assets/icon/加号.png"
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/icon/icon_mine.png",
        selectedIconPath: "./assets/icon/icon_mine_selected.png"
      }
    ]
  },
  // 配置小程序窗口
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#f96d40",
    navigationBarTitleText: "辅助大学生合理消费系统",
    navigationBarTextStyle: "black"
  }
};
