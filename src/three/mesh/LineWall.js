import vertexShader from "@/shader/LineWall/Vertex.glsl?raw";
import fragmentShader from "@/shader/LineWall/Fragment.glsl?raw";
export default class LineWall {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true);
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
    this.cylinder.position.set(0, 0.7, 0);
    this.cylinder.geometry.computeBoundingBox();
    // 获取物体的高度差
    let { min, max } = this.cylinder.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.shaderMaterial.uniforms.uHeight = {
      value: uHeight,
    };

    // 对物体进行缩放
    gsap.to(this.cylinder.scale, {
      x: 2,
      z: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });
  }
}
