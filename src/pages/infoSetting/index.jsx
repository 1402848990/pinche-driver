import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { AtButton, AtForm, AtInput, AtList, AtListItem } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        uid:1245
      },
      selector: [
       '男','女'
      ],
      selectorChecked: "男"
    };
  }

  componentWillMount() {}

  async componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = (field, value) => {
    console.log(field, value);
    if(field==='age'){
      value = Number(value)
    }
    const {userInfo} = this.state
    this.setState({
      userInfo:{
        ...userInfo,
        [field]: value
      }
    });
  };

  onSubmit = (a, b) => {
    console.log("submit", a, b);
  };
  onChange = (a, b) => {
    console.log("change", a, b);
  };

  render() {
    const { userName,age,uid } = this.state.userInfo;
    console.log("state", this.state,userName);
    return (
      <View className='userSetting'>
        <AtForm>
        <AtInput
          className='field'
          name='uid'
          title='UID'
          type='number'
          value={uid}
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
            onChange={this.handleChange.bind(this, "userName")}
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
          <AtButton className='btn-submit' type='primary' onClick={this.onSubmit}>提交</AtButton>
          <AtButton className='btn-reset'  formType='reset'>重置</AtButton>
        </AtForm>
      </View>
    );
  }
}
