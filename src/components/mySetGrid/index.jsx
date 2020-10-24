import Taro from "@tarojs/taro";
import React, { Component } from "react";
import {
  AtToast,
  AtGrid,
  AtInput,
  AtModalAction,
  AtModal,
  AtModalContent,
  AtModalHeader,
  AtFloatLayout
} from "taro-ui";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

const columns = [
  {
    image: "/assets/icon/payType.png",
    value: "支出类型",
    path: "payTypeList"
  },
  {
    image: "/assets/icon/incomeType.png",
    value: "收入类型",
    path: "incomeTypeList"
  },
  {
    image:
      "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
    value: "心愿清单",
    path: "wishList"
  },
  {
    image: "/assets/icon/支付-余额.png",
    value: "本月预算"
  },
  {
    image: "",
    value: ""
  },
  {
    image: "/assets/icon/帮助.png",
    value: "使用帮助"
  }
];

export default class MySetGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthMoney: 0,
      isOpened: false,
      helpOpen: false
    };
  }

  onClick = (item, index) => {
    console.log(item, index);
    if (index === 3) {
      this.setState({ isOpened: true });
    } else if (index === 5) {
      this.setState({
        helpOpen: true
      });
    } else {
      Taro.navigateTo({
        url: `/pages/${item.path}/index`
      });
    }
  };

  closeHelp = () => {
    this.setState({
      helpOpen: false
    });
  };

  onConfirm = (value) => {
    this.props.monthMoneyChange(value,'confirm');
    this.setState({
      isOpened: false
    });
  };

  render() {
    const { isOpened, helpOpen } = this.state;
    return (
      <>
        <AtFloatLayout
          isOpened={helpOpen}
          title='使用帮助'
          onClose={this.closeHelp}
        >
          关于本软件的使用帮助、介绍啥的。。。。。。。
        </AtFloatLayout>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>设置本月预算</AtModalHeader>
          <AtModalContent className='modalContent'>
            <AtInput
              className='field'
              border={false}
              required
              name='title'
              title='本月预算'
              type='number'
              placeholder='请输入本月预算'
              value={this.props.monthMoney}
              onChange={this.props.monthMoneyChange}
            />
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={() => {
                this.setState({ isOpened: false });
              }}
            >
              取消
            </Button>{" "}
            <Button onClick={this.onConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
        <AtGrid className='atGrid' data={columns} onClick={this.onClick} />
      </>
    );
  }
}
