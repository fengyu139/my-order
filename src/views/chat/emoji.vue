<script setup lang="ts">
const emojiList = reactive([
  "😀",
  "😄",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🥰",
  "🤩",
  "😘",
  "🥲",
  "😋",
  "🫢",
  "🫣",
  "😝",
  "🫡",
  "🤔",
  "🤨",
  "😑",
  "😏",
  "🙄",
  "😮‍💨",
  "😌",
  "😔",
  "😪",
  "🤒",
  "😎",
  "🤓",
  "🧐",
  "😟",
  "🥹",
  "😳",
  "😠",
  "😵‍💫",
  "🤤",
  "👍",
  "✊",
  "🙏",
  "🤝",
  "👀",
]);
const emit = defineEmits(["emojiClick"]);
</script>

<template>
  <div class="w-full bg-[#f4f4f4] z-50">
    <div class="grid grid-cols-8 gap-[4px] py-[4px]">
      <div
        v-for="(item, index) in emojiList"
        :key="index"
        class="text-center text-[24px] cursor-pointer"
        @click="$emit('emojiClick', item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
