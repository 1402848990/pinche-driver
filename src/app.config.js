export default {
  pages: [
    "pages/index/index", // 首页
    "pages/mine/index", // 我的
    "pages/addAccount/index", // 记一笔
    "pages/myInfoSet/index", // 用户信息设置
    "pages/payTypeList/index", // 添加支出类型
    "pages/incomeTypeList/index", // 添加收入类型
    "pages/pushRecord/index", // 发布记录
    "pages/wallet/index", // 钱包
    "pages/push/add", // 发布行程

  ],
  // 配置下方导航栏
  tabBar: {
    borderStyle: "white",
    selectedColor: "#d23d3d",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/icon/首页.png",
        selectedIconPath: "./assets/icon/首页.png"
      },
      {
        pagePath: "pages/push/add",
        text: "发布行程",
        iconPath: "./assets/icon/发布.png",
        selectedIconPath: "./assets/icon/发布.png"
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/icon/我的.png",
        selectedIconPath: "./assets/icon/我的.png"
      }
    ]
  },
  // 配置小程序窗口
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#f96d40",
    navigationBarTitleText: "拼车乘客端",
    navigationBarTextStyle: "black"
  }
};
