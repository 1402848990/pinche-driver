import React, { Component } from "react";
import { View } from "@tarojs/components";
import TypeList from "../../components/typeList";
import "./index.scss";

// const defaultColumns = [
//   {
//     icon: "/assets/icon/生活费.png",
//     title: "生活费"
//   },
//   {
//     icon: "/assets/icon/国家奖学金.png",
//     title: "奖学金"
//   },
//   {
//     icon: "/assets/icon/校园兼职.png",
//     title: "兼职"
//   }
// ];

export default class Index extends Component {
  render() {
    console.log("收入");
    return (
      <View>
        <TypeList type='income' />
      </View>
    );
  }
}
