<script setup lang="ts">
import SlotDemo from "@/components/slotDemo.vue";
const comData = reactive({
  a: 1,
  b: 2,
  C: 3,
});
import myToast from "@/components/abToast";

const showMyToast = () => {
  myToast.text("这是测试");
};
</script>

<template>
  <div>
    <SlotDemo :comData="comData">
      <template #a="slotProps">
        <div class="text-red-500">这是插槽{{ slotProps.text }}</div>
      </template>
      这是插槽
      <template #b="slotProps">
        <div class="text-green-500">{{ slotProps.text }}b</div>
      </template>
    </SlotDemo>
    <NutButton type="primary" @click="showMyToast">a++</NutButton>
  </div>
</template>

<style lang="scss" scoped></style>
