<script setup lang="ts">
const props = defineProps(["comData"]);
</script>

<template>
  <div>
    <slot name="b" :text="comData.b"></slot>
    <slot name="a" :text="comData.a"></slot>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
