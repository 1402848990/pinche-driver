import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import moment from "moment";
import util from "../../utils/index";
import {
  AtGrid,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtInput,
  AtDivider,
  AtIcon
} from "taro-ui";
import "./index.scss";

const payColumns = [
  {
    image: "/assets/icon/type/餐饮.png",
    value: "餐饮"
  },
  {
    image: "/assets/icon/type/学习.png",
    value: "学习"
  },
  {
    image: "/assets/icon/type/书籍.png",
    value: "书籍"
  },
  {
    image: "/assets/icon/type/购物.png",
    value: "购物"
  },
  {
    image: "/assets/icon/type/日用品.png",
    value: "日用"
  },
  {
    image: "/assets/icon/type/交通.png",
    value: "交通"
  },
  {
    image: "/assets/icon/type/水果.png",
    value: "水果"
  },
  {
    image: "/assets/icon/type/零食.png",
    value: "零食"
  },
  {
    image: "/assets/icon/type/服饰.png",
    value: "服饰"
  },
  {
    image: "/assets/icon/type/通讯费.png",
    value: "通讯"
  },
  {
    image: "/assets/icon/type/旅行.png",
    value: "旅行"
  }
];

const incomeColumns = [
  {
    image: "/assets/icon/type/生活费.png",
    value: "生活费"
  },
  {
    image: "/assets/icon/type/国家奖学金.png",
    value: "奖学金"
  },
  {
    image: "/assets/icon/type/校园兼职.png",
    value: "兼职"
  }
];
export default class MySetGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remark: "",
      date: Date.now(),
      typeList: [],
      selectedType: {}
    };
  }

  async componentDidMount() {
    this.getClassificationList();
  }

  // 获取收入/支出类型
  getClassificationList = async () => {
    const { type } = this.props;
    const res = await util.request("Classification/getAllClassification", {
      type
    });
    console.log("res", res);

    this.setState({
      typeList: res.data.data.map(item => {
        item.image = item.icon;
        item.value = item.title;
        return item;
      })
    });
  };

  // 选择类型
  onClick = (item, index) => {
    console.log(item, index);
    this.setState({
      selectedType: item
    });
  };

  handlePriceChange = (field, value) => {
    this.setState({
      [field]:value
    })
    console.log(field, value);
  };

  bindDateChange = ({ detail: { value } = {} }) => {
    console.log(value);
    this.setState({
      date: value
    });
  };

  getValues = () => this.state;

  render() {
    const { type } = this.props;
    const { price, remark, payType, date, typeList, selectedType } = this.state;
    return (
      <>
        <AtGrid
          columnNum={4}
          hasBorder={false}
          className='atGrid'
          data={typeList}
          onClick={this.onClick}
        />
        <AtDivider height={20} content='' />
        <View className='selectedView'>
          <Text className='remarkInput payTypeInput'>类型:</Text>
          <Image className='typeImg' src={selectedType.image} />
          <Text className='typeText'>{selectedType.value}</Text>
        </View>

        {/* 时间选择 */}
        <view class='section'>
          <Text class='section__title'>时间:</Text>
          <picker onChange={this.bindDateChange} mode='date' value={date}>
            <AtButton className='picker' size='small'>
              {moment(date).format('YYYY-MM-DD')}
            </AtButton>
          </picker>
        </view>
        <AtInput
          className='remarkInput remark'
          title='备注:'
          name='remark'
          type='text'
          value={remark}
          onChange={this.handlePriceChange.bind(this, "remark")}
        />
      </>
    );
  }
}
