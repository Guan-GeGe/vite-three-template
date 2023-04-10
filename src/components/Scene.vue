<script setup>
import '@/three/init.js'
/**
 * 使用vite自动导入
 * 1.导入场景  scene
 * 2.创建相机  camera
 * 3.创建物体
 * 4.添加灯光
 * 4.初始化渲染器  renderer
 * 5.添加坐标轴辅助器  controls
 * 6.导入animate函数
 * 另外：init里面是一些方法，并不需要导出，直接导入即可
 *      
 */


const sceneDiv = ref(null)

// 2.创建相机
scene.add(camera);

// 创建平面
createMesh()


// scene.add(light);
// 直线光源
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);


// 添加坐标轴辅助器
scene.add(axesHelper);

onMounted(() => {

  // console.log(sceneDiv);
  sceneDiv.value.appendChild(renderer.domElement)
  animate();

})
</script>

<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<style lang="less" scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
