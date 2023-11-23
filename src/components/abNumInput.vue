<script setup lang="ts">
const modelValue = defineModel();
console.log(modelValue);
</script>

<template>
  <div>
    <button @click="modelValue--">-</button>
    <input type="text" style="color: blue" v-model="modelValue" />
    <button @click="modelValue++">+</button>
  </div>
</template>

<style lang="scss" scoped></style>
