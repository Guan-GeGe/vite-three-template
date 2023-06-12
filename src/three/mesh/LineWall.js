import vertexShader from "@/shader/LineWall/Vertex.glsl?raw";
import fragmentShader from "@/shader/LineWall/Fragment.glsl?raw";
// 光墙
export default class LineWall {
  constructor(
    radius = 2,
    length = 2,
    position = { x: 0, z: 0 },
    color = "0xd83f2c"
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
        uColor: {
          value: new THREE.Color(color),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.mesh.position.set(position.x, 0.7, position.z);
    this.mesh.geometry.computeBoundingBox();
    // 获取物体的高度差
    let { min, max } = this.mesh.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.shaderMaterial.uniforms.uHeight = {
      value: uHeight,
    };

    // 对物体进行缩放
    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
