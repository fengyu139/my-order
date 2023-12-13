<script setup lang="ts">
import AbBall from "@/components/abBall.vue";
import { showToast } from "@nutui/nutui";
import http from "@/http/index";
import dayjs from "dayjs";
import AbNumInput from "@/components/abNumInput.vue";
const openNum = ref([0, 0, 0, 0, 0]);
const flag = ref("");
const chineseNumbers = [
  { label: "1", value: "一" },
  { label: "2", value: "二" },
  { label: "3", value: "三" },
  { label: "4", value: "四" },
  { label: "5", value: "五" },
];
const rows = ref(1);
const timer: any = ref();
const inThePrize = ref(false);
const getOpen = async () => {
  let res = await http.get("/lottery", {
    params: {
      rows: rows.value,
    },
  });
  openNum.value = res.data[0].drawResult.split(",");
  flag.value = res.data[0].issue;
  // countdown.value.reset();
  end.value = Date.now() + (60 - dayjs().second() + 10) * 1000;
};
getOpen();
const end = ref(Date.now() + (60 - dayjs().second() + 10) * 1000);
const countdown: any = ref(null);
const countdownEnd = () => {
  inThePrize.value = true;
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    getOpen();
  }, 1500);
};
watch(flag, () => {
  clearInterval(timer.value);
  inThePrize.value = false;
});
const checkboxgroup3 = ref(["1"]);
const submit = () => {
  if (checkboxgroup3.value.length && nums.value.length) {
    checkboxgroup3.value.forEach((item) => {
      nums.value.includes(openNum.value[item - 1] - 0) && console.log(item);
    });
  } else {
    showToast.warn("请选择正确的注单");
  }
};
const nums = ref([]);
const selectNum = (index) => {
  nums.value.includes(index)
    ? nums.value.splice(nums.value.indexOf(index), 1)
    : nums.value.push(index);
};
function generateUniqueRandomNumbers(min, max, count) {
  if (max - min + 1 < count) {
    throw new Error("范围内不够唯一数字可用");
  }

  const numbers = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  return numbers.sort((a, b) => a - b);
}

const start = () => {
  openNum.value = generateUniqueRandomNumbers(1, 10, 7);
  flag.value = new Date().getTime();
};
const stop = async () => {
  await http.get("/stop", {
    params: {
      rows: rows.value,
    },
  });
  showToast.success("成功");
};
const start2 = async () => {
  if (!!!expected.value) {
    return showToast.fail("请输入期望值");
  }
  await http.get("/start", {
    params: {
      token: token.value,
      expected: Number(expected.value),
      money: Number(money.value),
      checkbox: checkbox1.value,
    },
  });
  showToast.success("成功");
};
const token = ref("");
const expected = ref("");
const money = ref("");
const checkbox1 = ref(false);
const sYtoken = ref("");
const radioVal = ref("1");
const start3 = async () => {
  console.log(radioVal.value);

  if (!sYtoken.value) {
    return showToast.fail("请输入速盈token");
  }
  await http.get("/sYstart", {
    params: {
      token: sYtoken.value,
      radioVal: radioVal.value,
    },
  });
  showToast.success("成功");
};
const stop2 = async () => {
  await http.get("/sYstop");
  showToast.success("成功");
};
</script>

<template>
  <div>
    <div class="flex items-center">
      <AbBall
        v-for="(item, index) in openNum"
        :key="index"
        :num="item"
        :index="index"
        :flag="flag"
      ></AbBall>
      <!-- <div class="ml-[40px]">
        <nut-countdown
          v-if="!inThePrize"
          :end-time="end"
          ref="countdown"
          @end="countdownEnd"
        />
        <span v-else>开奖中...</span>
      </div> -->
    </div>
    <!-- <div class="mt-6">
      <nut-checkbox-group
        v-model="checkboxgroup3"
        ref="group"
        class="flex justify-around"
      >
        <nut-checkbox
          v-for="item in chineseNumbers"
          :key="item.label"
          :label="item.label"
          shape="button"
          >第{{ item.value }}球</nut-checkbox
        >
      </nut-checkbox-group>
    </div> -->
    <!-- <div class="mt-6">
      <ul class="grid grid-cols-5 gap-[18px]">
        <li v-for="item in 10" :key="item" @click="selectNum(item - 1)">
          <span
            class="block w-[30px] h-[30px] rounded-full bg-gray-400 mx-auto text-center leading-[30px]"
            :class="nums.includes(item - 1) ? 'bg-red-500' : ''"
            >{{ item - 1 }}</span
          >
        </li>
      </ul>
    </div> -->
    <div class="m-[10px]">
      <nut-input v-model="expected" placeholder="请输入期望值"></nut-input>
      <nut-input v-model="token" placeholder="请输入token"></nut-input>
      <NutInput v-model="money" placeholder="请输入金额"></NutInput>
    </div>
    <NutButton @click="start2">开始</NutButton>
    <NutButton style="margin-left: 20px" @click="stop" type="warning"
      >结束</NutButton
    >
    <nut-input v-model="sYtoken" placeholder="速盈token"></nut-input>
    <nut-radio-group v-model="radioVal" direction="horizontal">
      <nut-radio label="1">顺龙</nut-radio>
      <nut-radio label="2">反龙</nut-radio>
    </nut-radio-group>
    <NutButton @click="start3" style="margin-top: 20px" block>开始</NutButton>
    <NutButton style="margin-top: 20px" @click="stop2" block type="warning"
      >结束</NutButton
    >
  </div>
</template>

<style lang="scss">
#moving-element {
  width: 50px;
  height: 50px;
  background-color: blue;
  // margin-top: 100px;
  border-radius: 50%;
  // top: 300px;
  left: 0;
  transform: translate3d(0, 0, 0);
  position: absolute;
  bottom: 0;
}
</style>
