const clock = new THREE.Clock();

export default function animate() {
  let time = clock.getElapsedTime();

  renderer.render(scene, camera);
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(animate);
}
