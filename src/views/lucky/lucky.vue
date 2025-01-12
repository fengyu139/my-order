<template>
  <div class="lucky-container">
    <div class="wheel-container">
      <canvas ref="wheelCanvas" class="wheel-canvas"></canvas>
      <div class="wheel-pointer" @click="startRotate">
        <div class="pointer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { showToast } from "@nutui/nutui";

const wheelCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
const rotating = ref(false);
const currentRotation = ref(0);

// 奖品配置
const prizes = [
  { name: "一等奖", color: "#FFF4D6" },
  { name: "二等奖", color: "#FFFFFF" },
  { name: "三等奖", color: "#FFF4D6" },
  { name: "四等奖", color: "#FFFFFF" },
  { name: "五等奖", color: "#FFF4D6" },
  { name: "六等奖", color: "#FFFFFF" },
];

// 绘制转盘
const drawWheel = () => {
  if (!ctx || !wheelCanvas.value) return;

  const context = ctx as CanvasRenderingContext2D;
  const canvas = wheelCanvas.value;
  const center = canvas.width / 2;
  const radius = center - 20;
  const anglePerPrize = (Math.PI * 2) / prizes.length;

  context.save();
  context.translate(center, center);
  context.rotate(currentRotation.value);

  prizes.forEach((prize, index) => {
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(
      0,
      0,
      radius,
      index * anglePerPrize,
      (index + 1) * anglePerPrize
    );
    context.closePath();

    context.fillStyle = prize.color;
    context.fill();
    context.stroke();

    // 绘制文字
    context.save();
    context.rotate(index * anglePerPrize + anglePerPrize / 2);
    context.textAlign = "right";
    context.fillStyle = "#333333";
    context.font = "14px Arial";
    context.fillText(prize.name, radius - 30, 0);
    context.restore();
  });

  context.restore();
};

// 开始旋转
const startRotate = () => {
  if (rotating.value) return;

  rotating.value = true;
  const targetRotation =
    currentRotation.value + Math.PI * 2 * 8 + Math.random() * Math.PI * 2;
  const duration = 5000;
  const startTime = Date.now();
  const startRotation = currentRotation.value;

  const animate = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // 使用缓动函数使旋转更自然
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    currentRotation.value =
      startRotation + (targetRotation - startRotation) * easeOut(progress);

    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotating.value = false;
      // 计算最终停止的奖品
      const angle = currentRotation.value % (Math.PI * 2);
      const prizeIndex =
        Math.floor((angle / (Math.PI * 2)) * prizes.length) % prizes.length;
      showToast.text(`恭喜获得${prizes[prizeIndex].name}！`);
    }
  };

  animate();
};

onMounted(() => {
  if (wheelCanvas.value) {
    const canvas = wheelCanvas.value;
    ctx = canvas.getContext("2d");

    // 设置canvas尺寸
    canvas.width = 300;
    canvas.height = 300;

    drawWheel();
  }
});
</script>

<style scoped>
.lucky-container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.wheel-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.wheel-canvas {
  width: 100%;
  height: 100%;
}

.wheel-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
}

.pointer {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ff5722;
  transform: rotate(-90deg);
}
</style>
