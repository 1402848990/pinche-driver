import Taro from "@tarojs/taro";

// 请求接口
const request = async (url, postData = {}) => {
  console.log("postData", postData);
  const { nickName } = JSON.parse(Taro.getStorageSync("userInfo"));
  const res = await Taro.request({
    url: `http://localhost:8088/interface/${url}`,
    method: "POST",
    data: {
      nickName,
      ...postData
    }
  });
  return res;
};

export default {
  request
};
