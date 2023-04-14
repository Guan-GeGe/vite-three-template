import vertexShader from "@/shader/LineWall/Vertex.glsl?raw";
import fragmentShader from "@/shader/LineWall/Fragment.glsl?raw";
// 光墙
export default class LineWall {
  constructor(
    radius = 2,
    length = 2,
    position = { x: 0, z: 0 },
    color = "#ffff00"
  ) {
    this.geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      32,
      1,
      true
    );
    // this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uHeight: {
          value: 0,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.cylinder = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.cylinder.position.set(position.x, 0.7, position.z);
    this.cylinder.geometry.computeBoundingBox();
    // 获取物体的高度差
    let { min, max } = this.cylinder.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.shaderMaterial.uniforms.uHeight = {
      value: uHeight,
    };

    // 对物体进行缩放
    gsap.to(this.cylinder.scale, {
      x: length,
      z: length,
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  }
  remove() {
    this.cylinder.remove();
    this.cylinder.removeFromParent();
    this.cylinder.geometry.dispose();
    this.cylinder.material.dispose();
  }
}
