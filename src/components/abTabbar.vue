<script setup lang="ts">
import { Order, Home, My2, Scan, Category } from "@nutui/icons-vue";
const route = useRoute();
const tabList = [
  {
    tabTitle: "首页",
    to: "/",
    icon: Home,
  },
  {
    tabTitle: "订单",
    to: "/order",
    icon: Order,
  },
  {
    tabTitle: "管理",
    to: "/manage",
    icon: Scan,
  },
  {
    tabTitle: "统计",
    to: "/statistics",
    icon: Category,
  },
  {
    tabTitle: "我的",
    to: "/myProfile",
    icon: My2,
  },
];
const tabSwitch = (res) => {
  // if (res.tabTitle == "我的") {
  //   window.location.href = "http://localhost:7777";
  // }
};
//处理刷新选中
const tabIndex = ref(-1);
watchEffect(() => {
  const index = tabList.findIndex((item) => item.to == route.path);
  tabIndex.value = index;
});
</script>

<template>
  <div class="fixed bottom-0 w-full" v-show="tabIndex > -1">
    <nut-tabbar @tab-switch="tabSwitch" v-model="tabIndex">
      <nut-tabbar-item
        v-for="item in tabList"
        :tab-title="item.tabTitle"
        :icon="item.icon"
        :to="item.to"
      ></nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<style lang="scss" scoped></style>
