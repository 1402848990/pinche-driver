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
      isOpened: false
    };
  }
  componentWillMount() {}

  componentDidMount() {
    console.log("分类");
  }

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
    console.log('props...', this.props)
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
          {this.props.defaultColumns.map((item, index) => (
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

export default TypeList