import React, { Component } from "react";
import { View } from "@tarojs/components";
import TypeList from "../../components/typeList";
import "./index.scss";

const defaultColumns = [
  {
    icon: "/assets/icon/type/生活费.png",
    title: "生活费"
  },
  {
    icon: "/assets/icon/type/国家奖学金.png",
    title: "奖学金"
  },
  {
    icon: "/assets/icon/type/校园兼职.png",
    title: "兼职"
  }
];

export default class Index extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: "",
  //     isOpened: false
  //   };
  // }
  componentWillMount() {}

  async componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    console.log("收入");
    return (
      <View>
        <TypeList defaultColumns={defaultColumns} />
      </View>
    );
  }
}
