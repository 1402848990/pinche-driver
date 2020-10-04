import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtButton,
  AtFab,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput
} from "taro-ui";
import "./index.scss";

const defaultColumns = [
  {
    icon: "/assets/icon/type/餐饮.png",
    title: "餐饮"
  },
  {
    icon: "/assets/icon/type/学习.png",
    title: "学习"
  },
  {
    icon: "/assets/icon/type/书籍.png",
    title: "书籍"
  },
  {
    icon: "/assets/icon/type/购物.png",
    title: "购物"
  },
  {
    icon: "/assets/icon/type/日用品.png",
    title: "日用"
  },
  {
    icon: "/assets/icon/type/交通.png",
    title: "交通"
  },
  {
    icon: "/assets/icon/type/水果.png",
    title: "水果"
  },
  {
    icon: "/assets/icon/type/零食.png",
    title: "零食"
  },
  {
    icon: "/assets/icon/type/服饰.png",
    title: "服饰"
  },
  {
    icon: "/assets/icon/type/通讯费.png",
    title: "通讯"
  },
  {
    icon: "/assets/icon/type/旅行.png",
    title: "旅行"
  },
  {
    icon: "/assets/icon/type/水果.png",
    title: "水果"
  },
  {
    icon: "/assets/icon/type/零食.png",
    title: "零食"
  },
  {
    icon: "/assets/icon/type/服饰.png",
    title: "服饰"
  },
  {
    icon: "/assets/icon/type/通讯费.png",
    title: "通讯"
  },
  {
    icon: "/assets/icon/type/旅行.png",
    title: "旅行"
  }
];

export default class Index extends Component {
  constructor(props) {
    super(props);
    [];
    this.state = {
      value: "",
      isOpened: false
    };
  }
  componentWillMount() {}

  async componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onConfirm = () => {
    const { value } = this.state;
    console.log("ok");
  };

  addType = () => {
    this.setState({
      isOpened: true
    });
  };

  render() {
    const { value, isOpened } = this.state;
    return (
      <View className='payTypeList'>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>添加支出分类</AtModalHeader>
          <AtModalContent className='modalContent'>
            <AtInput
              className='field'
              border={false}
              required
              name='value'
              title='类型'
              type='text'
              placeholder='请输入类型'
              value={value}
              onChange={this.handleChange.bind(this, "value")}
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

        <AtList className='list'>
          {defaultColumns.map((item, index) => (
            <AtListItem key='title' title={item.title} thumb={item.icon} />
          ))}
        </AtList>
        <View className='float'>
          <AtButton circle className='btn-addType' onClick={this.addType}>
            添加分类
          </AtButton>
        </View>
      </View>
    );
  }
}
