<template>
  <picture>
    <!-- AVIF 版本 -->
    <source :srcset="avifPath" type="image/avif" @error="handleAvifError" />
    <img
      :src="currentSrc"
      :alt="alt"
      :class="className"
      :style="style"
      @load="handleLoad"
      @error="handleError"
    />
  </picture>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { ref } from "vue";

interface Props {
  src: string; // 原始图片路径
  alt?: string; // 图片替代文本
  className?: string; // 自定义类名
  style?: CSSProperties; // 自定义样式
  media?: string; // media 查询
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  className: "",
  style: () => ({}),
  media: "",
});

const emit = defineEmits<{
  (e: "load", event: Event): void;
  (e: "error", event: Event): void;
}>();

// 获取 AVIF 路径
const getAvifPath = (path: string) => {
  if (!path) return "";

  // 处理 @ 符号路径
  if (path.startsWith("@/")) {
    path = path.replace("@/", "/src/");
  }

  // 处理在线URL
  if (path.startsWith("http")) {
    return path.replace(/\.(png|jpg|jpeg|webp)$/i, ".avif");
  }

  // 处理本地资源
  const extension = path.split(".").pop()?.toLowerCase();
  if (["png", "jpg", "jpeg", "webp"].includes(extension || "")) {
    return path.replace(new RegExp(`\.${extension}$`), ".avif");
  }

  return path;
};

const currentSrc = ref(props.src);
const avifPath = ref(getAvifPath(props.src));

// 事件处理
const handleLoad = (event: Event) => {
  emit("load", event);
};

const handleError = (event: Event) => {
  emit("error", event);
};

// 处理 AVIF 加载错误时切换到原始图片
const handleAvifError = () => {
  currentSrc.value = props.src;
};

// 获取原始图片的 MIME 类型
const getOriginalType = (path: string) => {
  const ext = path.split(".").pop()?.toLowerCase();
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };
  return mimeTypes[ext as keyof typeof mimeTypes] || "image/jpeg";
};
</script>

<style scoped>
picture {
  display: inline-block;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
