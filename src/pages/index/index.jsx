import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
// import EcharsView from '../../components/echarsView/index'
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

const tabList = [{ title: "账单" }, { title: "智能分析" }];
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.typeSelectRef = React.createRef();
    this.state = {
      payTotal: 0, // 总支出
      incomeTotal: 0, // 总收入
      search: "", // 搜索
      current: 0,
      recordList: [],
      startDate: Date.now(), // 筛选开始时间
      endDate: Date.now(), // 筛选结束时间
      monthMoney: 0, // 本月结余
      message:''
    };
  }

  async componentDidMount() {
    await this.getRecordList();
    await this.getMonthMoney();
    // this.message();
  }

  async componentDidShow() {
    await this.getRecordList();
    await this.getMonthMoney();
    // this.message();
  }

  // 获取所有记录
  getRecordList = async obj => {
    const {
      data: { data }
    } = await utils.request("Record/getRecordList", { ...obj });
    // 总收入、总支出
    let payTotal = 0;
    let incomeTotal = 0;
    data.forEach(item => {
      item.type === "pay"
        ? (payTotal = payTotal + item.price)
        : (incomeTotal = incomeTotal + item.price);
    });
    console.log(payTotal, incomeTotal);
    await this.setState({
      recordList: data,
      payTotal,
      incomeTotal
    });
  };

  // 获取本月结余
  getMonthMoney = async () => {
    const {
      data: { data }
    } = await utils.request("Record/getRecordList", { isMonth: true });
    const {
      data: {
        info: { monthMoney }
      }
    } = await utils.request("User/userInfo");
    let payTotal = 0;
    let incomeTotal = 0;
    data.forEach(item => {
      item.type === "pay"
        ? (payTotal = payTotal + item.price)
        : (incomeTotal = incomeTotal + item.price);
    });
    // 剩余的钱
    const money = incomeTotal + monthMoney - payTotal;
    console.log("money", money, "monthMoney", monthMoney);
    // 过度消费  如果本月预算>100 && 结余<预算的10%
    if (money < monthMoney * 0.1 && monthMoney > 100) {
      this.setState({
        message:'您已过度消费！请节制！'
      })
    }
    if (money < monthMoney * 0.5 && monthMoney > 100) {
      this.setState({
        message:'请根据实际需要消费~'
      })
    }
    if (money > monthMoney * 0.8 && monthMoney > 100) {
      this.setState({
        message:'请在未来适度消费~不要难为自己喔~😯'
      })
    }
    this.setState({
      monthMoney: money
    });
  };

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

  changeTab = current => {
    this.setState({
      current
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
    await this.getRecordList({
      search
    });
  };

  // message = (type, message) => {
  //   Taro.atMessage({
  //     message,
  //     type
  //   });
  // };

  render() {
    const {
      recordList,
      startDate,
      endDate,
      current,
      payTotal,
      incomeTotal,
      monthMoney,
      message=''
    } = this.state;
    console.log('message', message)
    console.log("recordList", recordList);
    return (
      <View className='index'>
        {
          message &&  <AtNoticebar marquee icon='volume-plus'>
          {`${message}`}
        </AtNoticebar>
        }
        {/* <AtMessage /> */}
        {/* 头部 */}
        <View className='head'>
          <View className='at-row'>
            <View className='at-col payText'>共支出(元)</View>
            <View className='at-col'></View>
            {/* 时间范围选择 */}
            <View className='at-col datePicker'>
              {" "}
              <picker
                onChange={this.bindDateChange.bind(this, "startDate")}
                mode='date'
                value={startDate}
              >
                <AtButton className='picker' size='small'>
                  {moment(startDate).format("YYYY-MM-DD")}
                </AtButton>
              </picker>{" "}
              &nbsp;~&nbsp;{" "}
              <picker
                onChange={this.bindDateChange.bind(this, "endDate")}
                mode='date'
                value={endDate}
              >
                <AtButton className='picker' size='small'>
                  {moment(endDate).format("YYYY-MM-DD")}
                </AtButton>
              </picker>
            </View>
          </View>
          <View className='payNum'>￥{payTotal}</View>
          <View className='at-row'>
            <View className='at-col'>
              共收入 <Text className='incomeNum'>￥{incomeTotal}</Text>{" "}
            </View>
            <View className='at-col'></View>
            <View className='at-col'>
              本月结余： <Text className='jieyuNum'>{`￥ ${monthMoney}`}</Text>
            </View>
          </View>
        </View>
        {/* 搜索 */}
        <AtSearchBar
          value={this.state.search}
          onChange={this.onSearchChange}
          onActionClick={this.onSearch}
          placeholder='根据备注搜索'
        />
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.changeTab}
        >
          <AtTabsPane current={this.state.current} index={0}>
            {current === 0 && (
              <View className='recordList'>
                {recordList.map((item, index) => {
                  const type = JSON.parse(item.selectedType);
                  return (
                    <AtCard
                      key={item.id}
                      note={`备注：${item.remark}`}
                      extra={`${item.price > 99 ? "大额" : ""}`}
                      title={moment(item.date).format("YYYY-MM-DD")}
                      thumb='/assets/icon/日历.png'
                    >
                      <View className='item'>
                        <Image className='img' src={type.icon} />
                        <Text className='title'>{type.title}</Text>
                        <Text
                          className={`price ${
                            item.type === "pay" ? "payColor" : "incomeColor"
                          }`}
                        >
                          {item.price}
                        </Text>
                      </View>
                    </AtCard>
                  );
                })}
              </View>
            )}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {current === 1 && (
              <View style='padding: 20px 10px;background-color: #FAFBFC;text-align: center;'>
                {/* <EcharsView /> */}
              </View>
            )}
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
