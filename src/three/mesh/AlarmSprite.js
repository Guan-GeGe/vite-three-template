export default class AlarmSprite {
  constructor(name = "火警", position = { x: -4.2, z: -1 }) {
    // console.log(name);
    const textloader = new THREE.TextureLoader();
    let nameList = {
      火警: "./textures/tag/fire.png",
      电力: "./textures/tag/e.png",
      治安: "./textures/tag/jingcha.png",
    };
    const map = textloader.load(nameList[name]);
    this.material = new THREE.SpriteMaterial({
      map: map,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    this.mesh = new THREE.Sprite(this.material);

    this.mesh.position.set(position.x, 3.5, position.z);
    this.fns = [];

    // 创建射线，来判断鼠标是否点击了警告的标识
    this.raycaster = new THREE.Raycaster();
    this.raycaster.camera = camera;
    this.mouse = new THREE.Vector2();
    window.addEventListener("click", (event) => {
      // console.log(scene);
      this.mouse.x = (event.layerX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.layerY / window.innerHeight) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.mouse, camera);
      // 检测碰撞，是否碰到物体
      const intersects = this.raycaster.intersectObjects([this.mesh], true);
      // console.log(intersects);
      if (intersects.length > 0 && intersects[0].object === this.mesh) {
        this.fns.forEach((fn) => {
          fn(event);
        });
      }
    });
  }
  onClick(fn) {
    this.fns.push(fn);
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
