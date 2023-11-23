<script setup lang="ts">
import gsap from "gsap";
const props = defineProps(["num", "index", "flag"]);
const animationDom = ref(null);
const animation = () => {
  gsap.fromTo(
    animationDom.value,
    { y: 0 },
    {
      y: -42 * (props.num || 10),
      repeatRefresh: true,
      ease: "power1.out",
      duration: 0.2 * (props.num || 10),
    }
  );
};
onMounted(() => {
  animation();
});
watch(
  () => props.flag,
  () => {
    gsap.fromTo(
      animationDom.value,
      { y: 0 },
      {
        y: -42 * 9,
        repeatRefresh: true,
        ease: "none",
        duration: 1,
        delay: 0.2 * (props.index || 0),
        onComplete: () => {
          animation();
        },
      }
    );
  }
);
</script>

<template>
  <div class="overflow-hidden w-[36px] h-[48px]">
    <ul class="animation" ref="animationDom">
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  li {
    height: 36px;
    line-height: 36px;
    background: url("@/assets/icon1.png") no-repeat;
    background-size: 100% 100%;
    @apply text-center my-[6px];
  }
}
</style>
