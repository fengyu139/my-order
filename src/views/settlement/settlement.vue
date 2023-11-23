<script setup lang="ts">
import http from "@/http/index";
const storeOrder = useStorage("storeOrder", "");
const orderList = ref({});
const socket: any = inject("socket");
socket.close();
http.post("/orderList", { id: storeOrder.value }).then((res) => {
  orderList.value = res.data[0];
});
</script>

<template>
  <div class="text-center pt-[20px]">
    <h2>正在准备中</h2>
    <h2>
      您的取餐号是:
      <span class="text-red-500">{{ $route.query.orderFlag }}</span>
    </h2>
    <div
      class="mb-[6px] text-[12px] text-gray-500 flex justify-around items-center"
    >
      <span>下单时间 : <span v-FormatTime="orderList.createdTime"></span></span>
      <span
        >订单金额 :<nut-price :price="orderList.totalMoney" symbol="¥"
      /></span>
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
        v-for="rItem in orderList.orderDetail?.filter(
          (rItem) => rItem.count > 0
        )"
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
