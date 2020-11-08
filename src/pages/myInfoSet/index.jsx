import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtToast
} from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      selector: ["女", "男"],
      selectorChecked: "男",
      isOpened: false
    };
  }
  async componentDidMount() {
    const { nickName: userName } = JSON.parse(Taro.getStorageSync("userInfo"));
    console.log("userName...", userName);
    // 从数据库获取用户信息
    const res = await Taro.request({
      url: "http://localhost:8088/api/User/userInfo",
      method: "POST",
      data: {
        userName
      }
    });
    console.log("res...", res);
    const { data: { info } = {} } = res;
    console.log("info", info, this.selector);
    this.setState({
      userInfo: info,
      selectorChecked: this.state.selector[Number(info.sex)]
    });
  }

  handleChange = (field, value) => {
    console.log(field, value);
    if (field === "age") {
      value = Number(value);
    }
    const { userInfo } = this.state;
    this.setState({
      userInfo: {
        ...userInfo,
        [field]: value
      }
    });
  };

  // 提交
  onSubmit = async () => {
    console.log("state.userInfo", this.state.userInfo);
    const res = await Taro.request({
      url: "http://localhost:8088/api/User/editUserInfo",
      method: "POST",
      data: {
        changeData: {
          ...this.state.userInfo,
          sex: this.state.selectorChecked === "女" ? 0 : 1
        }
      }
    });
    console.log("res", res.data.success);
    if (res.data.success) {
      this.setState({
        isOpened: true
      });
      setTimeout(() => {
        this.setState({
          isOpened: false
        });
      }, 3000);
    }
  };

  // 处理性别选择
  onChange = ({ detail: { value } = {} }) => {
    console.log("value", value);
    this.setState({
      selectorChecked: this.state.selector[Number(value)]
    });
  };

  reset = () => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        age: 0
      },
      selectorChecked: ""
    });
  };

  onGetRegion = region => {
    // 参数region为选择的省市区
    console.log(region);
  };

  render() {
    const { userName, age, id,phone,createdAt } = this.state.userInfo;
    console.log("state", this.state, userName);
    return (
      <View className='userSetting'>
        <AtToast
          isOpened={this.state.isOpened}
          text='修改成功'
          icon='success'
          status='success'
        ></AtToast>
        <AtForm>
          <AtInput
            className='field'
            name='id'
            title='ID'
            type='number'
            value={id}
            editable={false}
          />
          <AtInput
            className='field'
            name='createdAt'
            title='注册时间'
            type='text'
            value={createdAt}
            editable={false}
          />
          <AtInput
            className='field'
            required
            name='userName'
            title='昵称'
            type='text'
            placeholder='用户名'
            value={userName}
            editable={false}
            onChange={this.handleChange.bind(this, "userName")}
          />
          <AtInput
            className='field'
            required
            name='phone'
            title='手机号'
            type='phone'
            placeholder='手机号'
            value={phone}
            onChange={this.handleChange.bind(this, "phone")}
          />
          <AtInput
            className='field'
            required
            name='age'
            title='年龄'
            type='number'
            placeholder='年龄'
            value={age}
            onChange={this.handleChange.bind(this, "age")}
          />
          <View>
            <Picker
              mode='selector'
              range={this.state.selector}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem
                  title='性别'
                  extraText={this.state.selectorChecked}
                />
              </AtList>
            </Picker>
          </View>
          <AtButton
            className='btn-submit'
            type='primary'
            onClick={this.onSubmit}
          >
            提交
          </AtButton>
          <AtButton className='btn-reset' onClick={this.reset}>
            重置
          </AtButton>
        </AtForm>
      </View>
    );
  }
}
