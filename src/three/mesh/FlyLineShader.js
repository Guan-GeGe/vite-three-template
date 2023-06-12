// 使用着色器生成飞线
import vertexShader from "@/shader/FlyLine/Vertex.glsl?raw";
import fragmentShader from "@/shader/FlyLine/Fragment.glsl?raw";
export default class FlyLineShader {
  /**
   * 1.首先创建出来对应的曲线
   * 2.曲线应该是开始大，然后慢慢变小
   */
  constructor(position = { x: 0, z: -14 }) {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(position.x / 2, 4, position.z / 2),
      new THREE.Vector3(position.x, 0, position.z),
    ];
    // 1.创建曲线
    this.points = new THREE.CatmullRomCurve3(linePoints);
    // 获取点
    const points = this.points.getPoints(1000);
    // 2.创建几何顶点
    this.geomatry = new THREE.BufferGeometry().setFromPoints(points);

    // 给每一个顶点设置属性
    const aSizeArray = new Float32Array(points.length);
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i;
    }
    // 设置几何体顶点属性
    this.geomatry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(aSizeArray, 1)
    );
    // 3.设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uLength: {
          value: aSizeArray.length,
        },
        uColor: {
          value: new THREE.Color(0x00008b),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      // 深度检测
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geomatry, this.shaderMaterial);
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 3,
      repeat: -1,
      ease: "none",
    });
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
