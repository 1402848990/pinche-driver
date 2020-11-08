import React, { Component } from "react";
import { View,Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtInput,
  AtModalAction
} from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      amount:100
    };
  }


  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onConfirm = async () => {
    console.log(this.state.amount)
    // const { title, price, wishLevel } = this.state;
    // const res = await util.request("Wish/addWish", {
    //   title,
    //   wishPrice: price,
    //   wishLevel
    // });
    // if (res.data.success) {
    //   this.setState({
    //     isOpened: false
    //   });
    //   this.getWishList();
    // }
    // console.log("res", res);
    // console.log(title, price, wishLevel);
  };

  render() {
    const { isOpened,amount } = this.state;
    return (
      <View className='wallet'>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>充值</AtModalHeader>
          <AtModalContent className='modalContent'>
            <AtInput
              className='field'
              border={false}
              required
              name='price'
              title='充值金额'
              type='number'
              placeholder='请输入充值金额'
              value={amount}
              onChange={this.handleChange.bind(this, "amount")}
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
        <AtList>
          <AtListItem onClick={()=>{this.setState({isOpened:true})}} title='余额' extraText='100.00元' arrow='right' />
          <AtListItem title='总充值' extraText='999元' />
          <AtListItem title='总账单' extraText='999元' />
        </AtList>
        <AtButton className='Recharge' onClick={()=>{this.setState({isOpened:true})}}>充值</AtButton>
      </View>
    );
  }
}
