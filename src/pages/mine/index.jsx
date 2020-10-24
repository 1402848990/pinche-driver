import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtAvatar, AtToast } from "taro-ui";
import MySetGrid from "../../components/mySetGrid";
import utils from "../../utils/index";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      toast: false,
      monthMoney: 0,
      monthOpened: false
    };
  }

  async componentWillMount() {
    const res = await Taro.getSetting({});
    console.log("setting...", res);
    if (res.authSetting["scope.userInfo"]) {
      const { userInfo } = await Taro.getUserInfo({});
      await this.setState({
        userInfo
      });
      Taro.setStorageSync("userInfo", JSON.stringify(userInfo));
      console.log("------userInfo...", userInfo);
    } else {
      console.log("请登录");
    }
  }

  async componentDidMount() {
    console.log("this.state.nickName", this.state.nickName);
    // if (this.state.nickName) {
    this.getUserInfoFromServer();
    // }
  }

  // 处理获取用户授权信息 ({ detail: { userInfo } = {} })
  handleGetUserInfo = async ({ detail: { userInfo } = {} }) => {
    console.log("userInfo..", userInfo);
    if (userInfo) {
      this.setState({
        userInfo
      });
      const { nickName, gender } = userInfo;
      // 创建账户
      const res = await Taro.request({
        url: "http://localhost:8088/api/User/register",
        method: "POST",
        data: {
          userName: nickName,
          sex: gender
        }
      });
      console.log("res...", res);
      Taro.setStorageSync("userInfo", JSON.stringify(userInfo));
    }
    console.log("getStorageSync...", Taro.getStorageSync("userInfo"));
  };

  // 获取用户信息
  getUserInfoFromServer = async () => {
    const res = await utils.request("User/userInfo");
    const { info: { monthMoney } = {} } = res.data;
    await this.setState({
      monthMoney
    });
    console.log("res...", res);
  };

  jumpInfoSetting = () => {
    const { userInfo } = this.state;
    if (userInfo.nickName) {
      Taro.navigateTo({
        url: "/pages/infoSetting/index"
      });
    } else {
      this.setState({
        toast: true
      });
    }
  };

  monthMoneyChange = async (value, confirm) => {
    console.log(value, confirm);
    const { nickName } = JSON.parse(Taro.getStorageSync("userInfo"));
    confirm === "confirm"
      ? await Taro.request({
          url: "http://localhost:8088/api/User/editUserInfo",
          method: "POST",
          data: {
            changeData: {
              userName: nickName,
              monthMoney: +this.state.monthMoney
            }
          }
        })
      : await this.setState({
          monthMoney: +value
        });
  };

  render() {

    const { userInfo, toast, monthMoney, monthOpened } = this.state;
    console.log("render--userInfo", userInfo);

    return (
      <View className='mine'>
        <AtToast isOpened={toast} text='请登录!'></AtToast>
        {/* 用户信息 */}
        <View onClick={this.jumpInfoSetting} className='userInfo'>
          {/* 头像 */}
          <AtAvatar
            className='avatar'
            openData={{ type: "userAvatarUrl" }}
            size='large'
            circle
            default-avatar='https://jdc.jd.com/img/200'
          ></AtAvatar>
          {/* 登录按钮 */}
          {userInfo.nickName ? (
            <>
              <Text className='userName'>{userInfo.nickName}</Text>
              <Text className='address'>
                {`${userInfo.country} ${userInfo.province} ${userInfo.city} ${
                  userInfo.gender === 1 ? "男" : "女"
                } `}{" "}
                青铜 >{" "}
              </Text>
            </>
          ) : (
            <AtButton
              lang='zh_CN'
              className='btn-login'
              openType='getUserInfo'
              onGetUserInfo={this.handleGetUserInfo}
              type='primary'
              size='small'
              circle
            >
              立即登录
            </AtButton>
          )}
        </View>

        <MySetGrid
          monthOpened={monthOpened}
          monthMoneyChange={this.monthMoneyChange}
          monthMoney={monthMoney}
        />

        {/* 版本信息 */}
        <Text className='version'> version V1.0</Text>
      </View>
    );
  }
}
