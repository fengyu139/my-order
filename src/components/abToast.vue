<script setup lang="ts">
interface Props {
  text: string;
  show?: boolean;
  close?: () => void;
}
const props = defineProps<Props>();
const close = () => {
  props.close && props.close();
  props.show = false;
};
// const show = ref(props.show || false);
</script>

<template>
  <div class="fixed w-full h-full flex justify-center items-center" v-if="show">
    <h1>{{ text }}</h1>
    <button @click="close">关闭</button>
  </div>
</template>

<style lang="scss" scoped></style>
