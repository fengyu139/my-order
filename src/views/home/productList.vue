<script setup lang="ts">
import { showImagePreview } from "@nutui/nutui";
import "@nutui/nutui/dist/packages/imagepreview/style";
import animationHook from "@/store/animationHook";
import icon1 from "@/assets/icon1.svg";
const props = defineProps(["list", "isFinish"]);
const disable = inject("disable");
const hooks = animationHook();
const add = (event: any, url: string) => {
  if (props.isFinish || disable.value) return;
  hooks.a.x = event.clientX - 15;
  hooks.a.y = event.clientY - 15;
  hooks.play(url);
  // console.log(event.screenY);
};
</script>

<template>
  <ul>
    <li
      class="flex items-center py-[4px] border-b border-[gray-300]"
      v-for="item in list"
    >
      <div>
        <nut-image
          :src="item.picImg"
          width="4rem"
          height="4rem"
          show-error
          @click="
            showImagePreview({ show: true, images: [{ src: item.picImg }] })
          "
        >
          <template #error>
            <icon1 color="#ccc" />
          </template>
        </nut-image>
      </div>

      <div class="ml-[12px]">
        <p class="text-[14px] text-gray-500">{{ item.name }}</p>
        <nut-price :price="item.price" symbol="¥" size="normal" /><span
          class="text-[12px] text-gray-500"
          >/{{ item.unit || "串" }}</span
        >
        <div>
          <nut-input-number
            button-size="26"
            input-width="32"
            v-model="item.count"
            :disabled="isFinish || disable"
            min="0"
            @add="add($event, item.picImg)"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
