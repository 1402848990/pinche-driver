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
    image: "/assets/发布记录.png",
    value: "发布记录",
    path: "pushRecord"
  },
  {
    image: "/assets/个人信息.png",
    value: "个人信息",
    path: "myInfoSet"
  },
  {
    image:
      "/assets/我的钱包.png",
    value: "我的钱包",
    path: "wallet"
  },
  {
    image: "/assets/紧急联系人.png",
    value: "紧急联系人"
  },
  {
    image: "/assets/紧急告警.png",
    value: "一键报警"
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
          <AtModalHeader>设置紧急联系人</AtModalHeader>
          <AtModalContent className='modalContent'>
            <AtInput
              className='field'
              border={false}
              required
              name='urgentName'
              title='紧急联系人姓名'
              type='text'
              placeholder='请输入紧急联系人姓名'
              value={this.props.monthMoney}
              onChange={this.props.monthMoneyChange}
            />
            <AtInput
              className='field'
              border={false}
              required
              name='urgentName'
              title='紧急联系人电话'
              type='number'
              placeholder='请输入紧急联系人电话'
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
