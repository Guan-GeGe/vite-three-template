// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设计相机位置
camera.position.set(0, 15, 10);

export default camera;
