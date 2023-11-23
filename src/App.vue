<script setup lang="ts">
import AbTabbar from "./components/abTabbar.vue";
import { useHomeStore } from "@/store/homeStore";
import { showDialog, showNotify } from "@nutui/nutui";
const route = useRoute();
import socket from "@/api/socket";
const store = useHomeStore();
store.getMenu(0, true);
provide("socket", socket);
socket.on("message", (data) => {
  if (!route.query.desk) {
    if (data.type == "addFoods") {
      showDialog({
        title: data.desk + "号桌-顾客加菜",
        content: data.msg,
        noCancelBtn: true,
        okText: "知道了",
      });
      let deskIndex = store.orderList.findIndex((item: any) => {
        return item.desk == data.desk;
      });
      store.orderList[deskIndex].undoneRecord = true;
    }
    if (data.type == "submitted") {
      if (data.desk) {
        showDialog({
          title: "新增订单",
          content: data.desk + "号桌-顾客已经提交了订单，请及时处理",
          noCancelBtn: true,
          okText: "知道了",
        });
      } else {
        showNotify.warn("您有新的订单，请及时处理");
      }
    }
  }
});
</script>

<template>
  <router-view />
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <AbTabbar></AbTabbar>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
