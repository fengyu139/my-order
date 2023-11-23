<script setup lang="ts">
import http from "@/http/index";
import { showToast } from "@nutui/nutui";
defineProps(["recordsList", "showBtn"]);
const itemToatl = (item: any) => {
  return item.reduce((pre: any, cur: any) => {
    return pre + cur.count * cur.price;
  }, 0);
};
const updateRecords = (item: any) => {
  http.post("/updateOneRecord", { id: item.id, isFinish: true }).then((res) => {
    item.isFinish = true;
    showToast.success("更新成功");
  });
};
</script>

<template>
  <div
    v-for="(item, index) in recordsList"
    :key="index"
    class="text-center text-[14px] px-[8px] border mb-[10px]"
  >
    <h3 v-if="index == 0">
      初始订单 :<nut-price :price="itemToatl(item.items)" symbol="¥" />
    </h3>
    <h3 v-else class="flex justify-around items-center py-[4px]">
      <span class="text-[13px]"
        >状态：<span
          :class="item.isFinish ? 'text-green-500' : 'text-red-500'"
          >{{ item.isFinish ? "已上菜" : "准备中" }}</span
        ></span
      >
      <span
        >第{{ index }}次加菜 :<nut-price
          :price="itemToatl(item.items)"
          symbol="¥"
      /></span>
      <span>
        <nut-button
          v-if="!item.isFinish && showBtn"
          type="success"
          size="small"
          @click="updateRecords(item)"
          >设置已上菜</nut-button
        >
      </span>
    </h3>
    <div class="mb-[6px] text-[12px] text-gray-500">
      <span>下单时间 : <span v-FormatTime="item.createTime"></span></span>
      <!-- <span>完成时间 : {{ item.createTime }}</span> -->
    </div>
    <ul>
      <li class="flex text-center text-[12px]">
        <span class="flex-1">菜名</span>
        <span class="flex-1">单价</span>
        <span class="flex-[0.5]"></span>
        <span class="flex-1"> 数量</span>
        <span class="flex-[0.5]"></span>
        <span class="flex-1"> 小记 </span>
      </li>
      <li
        v-for="rItem in item.items"
        :key="rItem.type"
        class="flex text-center text-[12px]"
      >
        <span class="flex-1">{{ rItem.name }}</span>
        <span class="flex-1">{{ rItem.price }}</span>
        <span class="flex-[0.5]">*</span>
        <span class="flex-1">{{ rItem.count }}</span>
        <span class="flex-[0.5]">=</span>
        <span class="flex-1"
          ><nut-price
            :price="rItem.price * rItem.count"
            symbol="¥"
            size="small"
          />
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
