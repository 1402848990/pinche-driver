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

class TypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isOpened: false,
      allTypeList: []
    };
  }

  async componentDidMount() {
    await this.getTypeList();
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  // 获取类型
  getTypeList = async () => {
    const { type } = this.props;
    const res = await Taro.request({
      url: "http://localhost:8088/api/Classification/getAllClassification",
      method: "POST",
      data: {
        userName: JSON.parse(Taro.getStorageSync("userInfo")).nickName,
        type
      }
    });
    console.log("type---res..", res);
    // const allTypeList = this.props.defaultColumns.concat(res.data.data || []);
    await this.setState({
      allTypeList:res.data.data || []
    });
  };

  onConfirm =async () => {
    const { value } = this.state;
    const { nickName } = JSON.parse(Taro.getStorageSync("userInfo"));
    console.log("ok--value", value);
    const res = await Taro.request({
      url: "http://localhost:8088/api/Classification/addClassification",
      method: "POST",
      data: {
        title: value,
        userName: nickName,
        type: this.props.type
      }
    });
    console.log('res..',res)
    if(res.data.success){
      await this.getTypeList()
      this.setState({
        isOpened:false
      })
    }
  };

  addType = () => {
    this.setState({
      isOpened: true
    });
  };

  render() {
    const { value, isOpened,allTypeList } = this.state;
    console.log("props...", this.props);
    console.log('allTypeList',allTypeList)
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
          {allTypeList.map((item, index) => (
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

export default TypeList;
