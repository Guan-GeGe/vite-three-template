import vertexShader from "@/shader/LineRader/Vertex.glsl?raw";
import fragmentShader from "@/shader/LineRader/Fragment.glsl?raw";
export default class LineRader {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    // this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new THREE.Color(0xffff00),
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.mesh.rotation.x = -(Math.PI / 2);
    this.mesh.position.set(-8, 1, 8);
    this.mesh.geometry.computeBoundingBox();
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
