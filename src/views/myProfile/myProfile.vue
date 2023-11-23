<script setup lang="ts">
import gsap from "gsap";
import http from "@/http/index";
import { showNotify } from "@nutui/nutui";
const state = reactive({
  blocks: [{ padding: "13px", background: "#617df2" }],
  prizes: [
    { fonts: [{ text: "再接再厉", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "5元", top: "10%" }], background: "#b8c5f2" },
    { fonts: [{ text: "10元", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "20元", top: "10%" }], background: "#b8c5f2" },
    { fonts: [{ text: "30元", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "40元", top: "10%" }], background: "#b8c5f2" },
    { fonts: [{ text: "50元", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "60元", top: "10%" }], background: "#b8c5f2" },
  ],
  buttons: [
    {
      radius: "35%",
      background: "#8a9bf3",
      pointer: true,
      fonts: [{ text: "开始", top: "-10px" }],
    },
  ],
});
const myLucky: any = ref(null);
const tweened = reactive({
  number: 0,
});
const startCallback = async () => {
  // 调用抽奖组件的play方法开始游戏
  myLucky.value.play();
  let res = await http.get("/playGame");
  balance.value = balance.value - 5;
  tweened.number = balance.value;
  setTimeout(() => {
    myLucky.value.stop(res.data.randomValue);
  }, 2500);
  setTimeout(() => {
    if (res.data.randomValue != 0) {
      showNotify.success(
        `恭喜您抽中了${state.prizes[res.data.randomValue].fonts[0].text}`
      );
    }
    balance.value = res.data.balance;
    gsap.to(tweened, { duration: 0.8, number: Number(balance.value) || 0 });
  }, 4500);
};
const balance = ref(0);
const getBalance = async () => {
  let res = await http.get("/balance");
  balance.value = res.data;
  tweened.number = res.data;
};
getBalance();
const customNumber = ref(618);
const bgImage = ref(
  "https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png"
);
const run = () => {
  let timer = null;
  timer = setInterval(() => {
    customNumber.value = Math.floor(Math.random() * (7000 - 1000 + 1) + 100);
  }, 5000);
};
onMounted(() => {
  run();
});
</script>

<template>
  <div class="flex justify-center">
    <LuckyWheel
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="state.prizes"
      :blocks="state.blocks"
      :buttons="state.buttons"
      @start="startCallback"
    />
  </div>
  <h2 class="text-center">
    您的余额：<span class="text-red-500">{{ tweened.number.toFixed(2) }}</span>
  </h2>
  <div>
    <nut-countup
      :custom-change-num="customNumber"
      :custom-bg-img="bgImage"
      :custom-spac-num="11"
      :num-width="33"
      :num-height="47"
      :during="5000"
    >
    </nut-countup>
  </div>
</template>

<style lang="scss" scoped></style>
