// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 自动旋转
// controls.autoRotate = true;
// 旋转速度
// controls.autoRotateSpeed = 0.2;
export default controls;
