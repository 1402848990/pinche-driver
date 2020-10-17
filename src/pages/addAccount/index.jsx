import React, { Component } from "react";
import Taro from "@tarojs/taro";
import moment from "moment";
import { View, Text, Image } from "@tarojs/components";
import {
  AtButton,
  AtTabs,
  AtTabsPane,
  AtInput,
  AtDivider,
  AtIcon
} from "taro-ui";
import TypeSelectGrid from "../../components/typeSelectGrid";

import "./index.scss";
import utils from "../../utils";

const tabList = [{ title: "支出" }, { title: "收入" }];

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.typeSelectRef = React.createRef();
    this.state = {
      current: 0,
      price: 0
    };
  }

  changeTab = current => {
    this.setState({
      current
    });
  };

  // 处理价格变更
  handlePriceChange = (field, value) => {
    console.log(field, value);
    this.setState({
      [field]: value
    });
  };

  // 保存
  save = async () => {
    const { price, current } = this.state;
    const {
      remark,
      date,
      selectedType
    } = this.typeSelectRef.current.getValues();
    const res = await utils.request("Record/addRecord", {
      type: ["pay", "income"][current],
      remark,
      date,
      price: +price,
      classification: selectedType.id
    });
    console.log("res", res);
  };

  render() {
    const { price, current } = this.state;
    console.log("state", this.state);
    return (
      <View className='addAccount'>
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.changeTab}
        >
          {/* 支出 */}
          <AtTabsPane current={this.state.current} index={0}>
            {current === 0 && (
              <View style='padding: 20px 10px;background-color: #FAFBFC;text-align: center;'>
                {/* 价格 */}
                <AtInput
                  className='priceInput'
                  name='price'
                  autoFocus
                  focus
                  type='number'
                  value={price}
                  onChange={this.handlePriceChange.bind(this, "price")}
                />

                {/* 支出类型选择 */}
                <TypeSelectGrid ref={this.typeSelectRef} type='pay' />
              </View>
            )}
          </AtTabsPane>

          {/* 收入 */}
          <AtTabsPane current={this.state.current} index={1}>
            {current === 1 && (
              <View style='padding: 20px 10px;background-color: #FAFBFC;text-align: center;'>
                <AtInput
                  className='priceInput'
                  name='price'
                  type='number'
                  value={price}
                  onChange={this.handlePriceChange.bind(this, "price")}
                />
                <TypeSelectGrid ref={this.typeSelectRef} type='income' />
              </View>
            )}
          </AtTabsPane>
        </AtTabs>
        <AtButton onClick={this.save} circle className='btn-save'>
          保存
        </AtButton>
      </View>
    );
  }
}
