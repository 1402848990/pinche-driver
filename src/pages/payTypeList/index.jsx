import React, { Component } from "react";
import { View } from "@tarojs/components";
import TypeList from "../../components/typeList";
import "./index.scss";

const defaultColumns = [
  {
    icon: "/assets/icon/type/餐饮.png",
    title: "餐饮"
  },
  {
    icon: "/assets/icon/type/学习.png",
    title: "学习"
  },
  {
    icon: "/assets/icon/type/书籍.png",
    title: "书籍"
  },
  {
    icon: "/assets/icon/type/购物.png",
    title: "购物"
  },
  {
    icon: "/assets/icon/type/日用品.png",
    title: "日用"
  },
  {
    icon: "/assets/icon/type/交通.png",
    title: "交通"
  },
  {
    icon: "/assets/icon/type/水果.png",
    title: "水果"
  },
  {
    icon: "/assets/icon/type/零食.png",
    title: "零食"
  },
  {
    icon: "/assets/icon/type/服饰.png",
    title: "服饰"
  },
  {
    icon: "/assets/icon/type/通讯费.png",
    title: "通讯"
  },
  {
    icon: "/assets/icon/type/旅行.png",
    title: "旅行"
  },
];

export default class Index extends Component {
  render() {
    console.log("支出");
    return (
      <View>
        <TypeList defaultColumns={defaultColumns} />
      </View>
    );
  }
}
