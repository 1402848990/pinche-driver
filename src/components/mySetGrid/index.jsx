import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { AtGrid } from "taro-ui";
import "./index.scss";

const columns = [
  {
    image: "/assets/icon/type/payType.png",
    value: "支出类型",
    path: "payTypeList"
  },
  {
    image: "/assets/icon/type/incomeType.png",
    value: "收入类型",
    path: "incomeTypeList"
  },
  {
    image:
      "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
    value: "心愿清单"
  },
  {
    image:
      "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
    value: "新品首发"
  },
  {
    image:
      "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
    value: "领京豆"
  },
  {
    image: "/assets/icon/type/帮助.png",
    value: "使用帮助"
  }
];

export default class MySetGrid extends Component {
  onClick = (item, index) => {
    console.log(item, index);
    Taro.navigateTo({
      url: `/pages/${item.path}/index`
    });
  };
  render() {
    return <AtGrid className='atGrid' data={columns} onClick={this.onClick} />;
  }
}
