// 初始化渲染器 渲染器透明
const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
});

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer;
