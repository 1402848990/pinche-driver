import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image,ScrollView } from "@tarojs/components";
import RecordFilter from "../../components/recordFilter";
import {
  AtButton,
  AtCard,
  AtIcon,
  AtTabs,
  AtTabsPane,
  AtSearchBar,
  AtMessage,
  AtNoticebar
} from "taro-ui";
import moment from "moment";
import utils from "../../utils/index";
import "./index.scss";

const OrderStatusMap = {
  0: "未出行",
  1: "进行中",
  2: "已完成",
  3: '已关闭'
};
const scrollStyle = {
  height: '450px'
}
const scrollTop = 0
const Threshold = 20
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.typeSelectRef = React.createRef();
    this.state = {
      search: "", // 搜索
      current: 0,
      recordList: [],
      startDate: Date.now(), // 筛选开始时间
      endDate: Date.now(), // 筛选结束时间
      monthMoney: 0, // 本月结余
      message: ""
    };
  }

  async componentDidMount() {
    console.log('-------')
    await this.getCusRecordList();
  }

  async componentDidShow() {
    console.log('#$$$$$$',this.ref.current)
    const filter = this.ref.current.getFilter()
    delete filter.isOpened
    delete filter.helpOpen
    delete filter.status
    await this.getCusRecordList(this.ref.current.getFilter());
  }


  // 处理时间选择
  bindDateChange = async (field, { detail: { value } = {} }) => {
    console.log(field, value);
    if (field === "startDate") {
      const { endDate } = this.state;
      await this.getRecordList({
        endDate:
          typeof endDate === "string" ? new Date(endDate).getTime() : endDate,
        [field]: typeof value === "string" ? new Date(value).getTime() : value
      });
    } else {
      const { startDate } = this.state;
      await this.getRecordList({
        startDate:
          typeof startDate === "string"
            ? new Date(startDate).getTime()
            : startDate,
        [field]: typeof value === "string" ? new Date(value).getTime() : value
      });
    }
    await this.setState({
      [field]: value
    });
  };

  onSearchChange = value => {
    this.setState({
      search: value
    });
  };

  // 点击搜索
  onSearch = async () => {
    const { search } = this.state;
    console.log("search", search);
    await this.getCusRecordList({
      search
    });
  };

    // 获取乘客订单记录
    getCusRecordList = async (filter) => {
      const res = await utils.request("CusRecord/getRecordList",filter);
      console.log("res...", res);
      if (res.data.success) {
        await this.setState({
          recordList: res.data.data
        });
      }
    };

  render() {
    const {
      recordList,
      startDate,
      endDate,
      current,
      message = ""
    } = this.state;
    console.log("message", message);
    console.log("recordList", recordList);
    return (
      <View className='index'>
        {message && (
          <AtNoticebar marquee icon='volume-plus'>
            {`${message}`}
          </AtNoticebar>
        )}
        {/* 头部筛选区域 */}
        <RecordFilter ref={this.ref} getCusRecordList={this.getCusRecordList} />
        {/* 搜索 */}
        <AtSearchBar
          value={this.state.search}
          onChange={this.onSearchChange}
          onActionClick={this.onSearch}
          placeholder='模糊搜索'
        />
        {/* 订单区域 */}
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          style={scrollStyle}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
        >
        <View className='pushRecord'>
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
        </ScrollView>
      </View>
    );
  }
}
