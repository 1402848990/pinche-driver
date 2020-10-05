import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtAvatar,AtToast } from "taro-ui";
import MySetGrid from '../../components/mySetGrid'
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);[]
    this.state = {
      userInfo: {},
      toast:false
    };
  }

  async componentWillMount() {
    const res = await Taro.getSetting({});
    console.log("setting...", res);
    if (res.authSetting["scope.userInfo"]) {
      const {userInfo} = await Taro.getUserInfo({});
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
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 处理获取用户授权信息
  handleGetUserInfo = ({ detail: { userInfo } = {} }) => {
    console.log("userInfo..", userInfo);
    if (userInfo) {
      this.setState({
        userInfo
      });
      Taro.setStorageSync("userInfo", JSON.stringify(userInfo));
    }
    console.log("getStorageSync...", Taro.getStorageSync("userInfo"));
  };

  jumpInfoSetting = ()=>{
    const {userInfo} = this.state
    if(userInfo.nickName){
      Taro.navigateTo({
        url: '/pages/infoSetting/index'
      })
    }else{
      this.setState({
        toast:true
      })
    }
   
  }

  render() {
    // const userInfoStr = Taro.getStorageSync("userInfo");
    // const userInfo = (userInfoStr && JSON.parse(userInfoStr)) || {};
    // const { nickName, city, province, country, avatarUrl, gender } = userInfo;
    // console.log("userInfo", Object.keys(userInfo).length);

    const { userInfo,toast } = this.state;
    console.log('render--userInfo', userInfo)

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
          <Text className='address'>中国 | 山东 | 济南  男  青铜 > </Text>
          </>
        ) : (
          <AtButton
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

        <MySetGrid />

         {/* 版本信息 */}
         <Text className='version'> version V1.0</Text>
      </View>
    );
  }
}
