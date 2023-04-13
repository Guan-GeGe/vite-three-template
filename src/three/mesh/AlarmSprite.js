export default class AlarmSprite {
  constructor() {
    const textloader = new THREE.TextureLoader();
    const map = textloader.load("./textures/warning.png");
    this.material = new THREE.SpriteMaterial({ map: map });

    this.mesh = new THREE.Sprite(this.material);

    this.mesh.position.set(-4.2, 3.5, -1);
    this.fns = [];

    // 创建射线，来判断鼠标是否点击了警告的标识
    this.raycaster = new THREE.Raycaster();
    this.raycaster.camera = camera;
    this.mouse = new THREE.Vector2();
    window.addEventListener("click", (event) => {
      console.log(scene);
      this.mouse.x = (event.layerX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.layerY / window.innerHeight) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.mouse, camera);
      // 检测碰撞，是否碰到物体
      const intersects = this.raycaster.intersectObjects([this.mesh], true);
      console.log(intersects);
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
}
