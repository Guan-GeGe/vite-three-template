import modifyCityMaterial from "../modify/modifyCityMaterial";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    // traverse()对里面每个的子元素进行执行;
    gltf.scene.traverse((item) => {
      if (item.type == "Mesh") {
        item.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e6f),
        });
        // 创建光圈效果
        modifyCityMaterial(item);
      }
    });
    scene.add(gltf.scene);
  });
  // 创建飞线
  const flyLine = new FlyLine();
  scene.add(flyLine.mesh);
  // 使用着色器创建飞线
  const flyLineShader = new FlyLineShader();
  scene.add(flyLineShader.mesh);
}
