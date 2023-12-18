<script setup lang="ts">
defineProps(["deskNum"]);
</script>

<template>
  <NutInput v-model="deskNum" placeholder="请输入桌号" type="digit"></NutInput>
</template>

<style lang="scss" scoped></style>
