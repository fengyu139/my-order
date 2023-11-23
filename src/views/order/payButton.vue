<script setup lang="ts">
import wx from "weixin-js-sdk";
const token = useStorage("token", "");
console.log(token);

const toPay = () => {
  // 构建支付请求参数
  const params = {
    appId: "your_appid",
    timestamp: "timestamp",
    nonceStr: "nonceStr",
    package: "package",
    signType: "signType",
    paySign: "paySign",
  };
  console.log(wx);
};
</script>

<template>
  <nut-button v-if="!!!token" type="primary" size="small" @click="toPay"
    >去付款</nut-button
  >
</template>

<style lang="scss" scoped></style>
