import { gsap, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(MotionPathPlugin);
export const b = reactive({
  x: 0,
  y: 0,
});
const animationHook = () => {
  const a = reactive({
    x: 0,
    y: 0,
  });
  const play = (url: string) => {
    let oDiv = document.createElement("div");
    document.body.appendChild(oDiv);
    oDiv.style.position = "fixed";
    oDiv.style.left = a.x + "px";
    oDiv.style.top = a.y + "px";
    oDiv.style.width = "30px";
    oDiv.style.height = "30px";
    const image = new Image();
    image.src = url;
    oDiv.appendChild(image);
    // oDiv.style.background = "red";
    oDiv.style.borderRadius = "50%";
    oDiv.style.overflow = "hidden";
    oDiv.style.transform = `translate3d(0, 0, 0)`;
    setTimeout(() => {
      gsap.to(oDiv, {
        motionPath: {
          path: [
            { x: 0, y: 0 }, // 起始点
            { x: -a.x + 120, y: -30 }, // 控制点
            { x: -a.x + 60, y: b.y - a.y + 20 }, // 终点
          ],
          align: oDiv, // 使元素沿路径旋转
        },
        scale: 0.2,
        opacity: 0.2,
        duration: 0.7, // 动画持续时间
        onComplete: () => {
          document.body.removeChild(oDiv);
        },
        // repeat: 1, // 无限循环
      });
    }, 100);
  };
  return {
    a,
    play,
  };
};
export default animationHook;
