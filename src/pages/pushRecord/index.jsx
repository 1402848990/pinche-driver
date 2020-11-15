import React, { Component } from "react";
import Taro from "@tarojs/taro";
import moment from 'moment'
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
  0: "未出行",
  1: "进行中",
  2: "已完成",
  3: '已关闭'
};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isOpened: false,
      recordList: [],
      price: 0.0,
      wishLevel: 1,
      delSucc: false
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    await this.getCusRecordList();
  }

  // 获取乘客订单记录
  getCusRecordList = async () => {
    const res = await util.request("CusRecord/getRecordList");
    console.log("res...", res);
    if (res.data.success) {
      await this.setState({
        recordList: res.data.data
      });
    }
  };

  addTrip = () => {
    Taro.switchTab({
      url: "/pages/push/add"
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
    let { isOpened, title, price, recordList, wishLevel } = this.state;

    return (
      <View className='pushRecord'>
        <AtToast
          isOpened={this.state.delSucc}
          text='删除成功'
          icon='success'
          status='success'
        ></AtToast>
        <View className='recordList'>
          {recordList.map((item, index) => {
            return (
              <AtCard
                key={item.id}
                note={`备注：${item.remark}`}
                extra={`￥${item.price||'-'}`}
                title={moment(item.date).format('YYYY-MM-DD HH:MM')}
                thumb='/assets/time_4px.png'
              >
                <View className='item'>
                  <View className='local'>
                    <Text className='startLocal'>{item.startLocal}</Text>
                  </View>
                  <View className='local'>
                    <Text className='endLocal'>{item.endLocal}</Text>
                  </View>
                  <View className='local'>
                    <Text className='createdAt'>发布时间：{moment(+item.createdAt).format('YYYY-MM-DD HH:MM:ss')}</Text>
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
