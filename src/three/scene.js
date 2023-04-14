// 1.创建场景
const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader().setPath("./textures/");
const envMapTexture = cubeTextureLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);
// 设置渲染场景的背景
scene.background = envMapTexture;
// 全场中物理场景的环境贴图
scene.environment = envMapTexture;
export default scene;
