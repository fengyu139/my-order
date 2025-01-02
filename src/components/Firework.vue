<template>
  <canvas ref="canvas" class="firework-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let particles: any[] = [];
let animationId: number;

const createParticles = (x: number, y: number) => {
  for (let i = 0; i < 50; i++) {
    const particle = {
      x,
      y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      color: `hsl(${Math.random() * 360}, 50%, 50%)`,
    };
    particles.push(particle);
  }
};

const animate = () => {
  if (!ctx || !canvas.value) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.size *= 0.95;

    if (particle.size < 0.1) {
      particles.splice(index, 1);
    }

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  }
};

const startFirework = () => {
  if (!canvas.value || !ctx) return;

  particles = [];
  const x = canvas.value.width / 2;
  const y = canvas.value.height / 2;
  createParticles(x, y);
  animate();

  // 2秒后清除效果
  setTimeout(() => {
    particles = [];
    if (ctx && canvas.value) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
    cancelAnimationFrame(animationId);
  }, 2000);
};

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});

defineExpose({ startFirework });
</script>

<style scoped>
.firework-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>
