// 使用tube材质创建飞线
export default class FlyLine {
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(7.5, 8, 0),
      new THREE.Vector3(14, 0, 0),
    ];
    // 1.创建曲线
    this.points = new THREE.CatmullRomCurve3(linePoints);
    // 2.根据曲线生成管道几何体
    this.geometry = new THREE.TubeGeometry(this.points, 100, 1, 2);
    // 添加纹理
    const textloader = new THREE.TextureLoader();
    this.texture = textloader.load("./textures/z_11.png");
    this.texture.repeat.set(1, 2);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;
    // 3.设置飞线材质
    this.meterial = new THREE.MeshBasicMaterial({
      // color: 0xfff000,
      map: this.texture,
      transparent: true,
    });
    // 4.创建飞线物体
    this.mesh = new THREE.Mesh(this.geometry, this.meterial);
    // 5.创建飞线动画
    gsap.to(this.texture.offset, {
      x: -1,
      duration: 3,
      repeat: -1,
      ease: "none",
    });
  }
}
