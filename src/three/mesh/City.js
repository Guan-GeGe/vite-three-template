import modifyCityMaterial from "../modify/modifyCityMaterial";
import AlarmSprite from "./AlarmSprite";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import LineRader from "./LineRader";
import LineWall from "./LineWall";
import meshLine from "./MeshLine";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/shanghaiCity.glb", (gltf) => {
    // traverse()对里面每个的子元素进行执行;
    gltf.scene.traverse((item) => {
      if (item.type == "Mesh") {
        item.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e6f),
        });
        // 创建光圈效果
        modifyCityMaterial(item);
        // 创建建筑线框效果
        console.log(item.name);
        if (item.name == "Layerbuildings") {
          const meshline = new meshLine(item.geometry);
          // 创建出来的线框是大的，所以我们需要对线框进行调整
          const size = item.scale.x * 1.001;
          meshline.mesh.position.set(
            item.position.x,
            item.position.y,
            item.position.z
          );
          meshline.mesh.scale.set(size, size, size);
          scene.add(meshline.mesh);
        }
      }
    });
    scene.add(gltf.scene);
  });
  // 创建飞线
  // const flyLine = new FlyLine();
  // scene.add(flyLine.mesh);
  // 使用着色器创建飞线
  // const flyLineShader = new FlyLineShader();
  // scene.add(flyLineShader.mesh);
  // 创建光墙特效;
  // const lineWall = new LineWall();
  // scene.add(lineWall.cylinder);
  // 创建雷达效果
  // const lineRader = new LineRader();
  // scene.add(lineRader.mesh);
  // 3d警告标识
  // const alarmSprite = new AlarmSprite();
  // const group = new THREE.Group();
  // group.add(alarmSprite.mesh);
  // scene.add(group);
  // alarmSprite.onClick(() => {
  //   console.log("警告");
  // });
}
