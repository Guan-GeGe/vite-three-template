// 使用EdgesGeometry生成建筑线框特效;
export default class MeshLine {
  constructor(geometry) {
    const edges = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}
