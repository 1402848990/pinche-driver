import React, { Component } from "react";
import Taro from "@tarojs/taro";
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
  AtToast,
  AtCard
} from "taro-ui";
import { View, Text, Button } from "@tarojs/components";
import util from "../../utils/index";
import "./index.scss";

const OrderStatusMap = {
  1: "已完成",
  2: "已关闭",
  3: "进行中"
};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isOpened: false,
      pushRecord: [],
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
        pushRecord: res.data.data
      });
    }
  };

  addTrip = () => {
    Taro.navigateTo({
      url: "/pages/info/add"
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
    let { isOpened, title, price, pushRecord, wishLevel } = this.state;
    pushRecord = [
      {
        id: 1,
        date: "2020-10-11 22:22:22",
        startLocal: "钱江block",
        endLocal: "杭州市民中心",
        price: 20,
        remark: "备注",
        status: 1
      },
      {
        id: 2,
        date: "2020-10-11 22:22:22",
        startLocal: "钱江block",
        endLocal: "杭州市民中心",
        price: 20,
        remark: "备注",
        status: 1
      },
      {
        id: 2,
        date: "2020-10-11 22:22:22",
        startLocal: "钱江block",
        endLocal: "杭州市民中心",
        price: 20,
        remark: "备注",
        status: 1
      }

    ];
    console.log("pushRecord", pushRecord);
    return (
      <View className='pushRecord'>
        <AtToast
          isOpened={this.state.delSucc}
          text='删除成功'
          icon='success'
          status='success'
        ></AtToast>
        <View className='recordList'>
          {pushRecord.map((item, index) => {
            return (
              <AtCard
                key={item.id}
                note={`备注：${item.remark}`}
                extra={`￥${item.price}`}
                title={item.date}
                thumb='/assets/time_4px.png'
              >
                <View className='item'>
                  <View className='local'>
                    <Text className='startLocal'>{item.startLocal}</Text>
                  </View>
                  <View className='local'>
                    <Text className='endLocal'>{item.endLocal}</Text>
                  </View>
                  <View className='status'>{OrderStatusMap[item.status]}</View>
                </View>
              </AtCard>
            );
          })}
        </View>
        <View className='float'>
          <AtButton circle className='btn-addType' onClick={this.addTrip}>
            发布行程
          </AtButton>
        </View>
      </View>
    );
  }
}
