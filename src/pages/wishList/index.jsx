import React, { Component } from "react";
import {
  AtButton,
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
  AtSlider,
  AtToast
} from "taro-ui";
import { View, Text, Button } from "@tarojs/components";
import util from "../../utils/index";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isOpened: false,
      wishList: [],
      price: 0.0,
      wishLevel: 1,
      delSucc: false
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    await this.getWishList();
  }

  // 获取心愿列表
  getWishList = async () => {
    const res = await util.request("Wish/getWishList");
    console.log("res...", res);
    if (res.data.success) {
      await this.setState({
        wishList: res.data.data
      });
    }
  };

  addType = () => {
    this.setState({
      isOpened: true
    });
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onConfirm = async () => {
    const { title, price, wishLevel } = this.state;
    const res = await util.request("Wish/addWish", {
      title,
      wishPrice: price,
      wishLevel
    });
    if (res.data.success) {
      this.setState({
        isOpened: false
      });
      this.getWishList();
    }
    console.log("res", res);
    console.log(title, price, wishLevel);
  };

  // 点击删除
  handleClick = async id => {
    console.log("id", id);
    const res = await util.request("Wish/deleteWish", { id });
    if (res.data.success) {
      this.setState({
        delSucc: true
      });
      this.getWishList();
      setTimeout(() => {
        this.setState({
          delSucc: false
        });
      }, 2000);
    }
  };

  render() {
    const { isOpened, title, price, wishList, wishLevel } = this.state;
    console.log("wishList", wishList);
    return (
      <View className='wishList'>
        <AtToast
          isOpened={this.state.delSucc}
          text='删除成功'
          icon='success'
          status='success'
        ></AtToast>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>添加支出分类</AtModalHeader>
          <AtModalContent className='modalContent'>
            <AtInput
              className='field'
              border={false}
              required
              name='title'
              title='名称'
              type='text'
              placeholder='请输入名称'
              value={title}
              onChange={this.handleChange.bind(this, "title")}
            />
            <AtInput
              className='field'
              border={false}
              required
              name='price'
              title='价格'
              type='number'
              placeholder='请输入价格'
              value={price}
              onChange={this.handleChange.bind(this, "price")}
            />
            <Text className='wishNum'>心愿个数:</Text>
            <AtSlider
              onChange={this.handleChange.bind(this, "wishLevel")}
              value={wishLevel}
              showValue
              min={1}
              max={5}
            ></AtSlider>
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
        <AtList>
          {wishList.map(item => (
            <AtListItem
              key={item.id}
              title={item.title}
              note={(item.wishLevel, item.wishPrice)}
              onClick={this.handleClick.bind(this, item.id)}
              arrow='right'
              extraText='删除'
            />
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
