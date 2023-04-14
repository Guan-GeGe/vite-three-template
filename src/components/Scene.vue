<script setup>
import AlarmSprite from '@/three/mesh/AlarmSprite.js'
import '@/three/init.js'
import LineWall from '../three/mesh/LineWall';
import FlyLineShader from '@/three/mesh/FlyLineShader.js'
import LineRader from '@/three/mesh/LineRader.js'
import { ref } from 'vue';
const props = defineProps(['listInfos']);
// console.log(props.listInfos);
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
let eventListMesh = ref([])
// 对物体进行动态的生成
let mapFn = {
  '火警': (position) => {
    // 创建光墙

    const lineWall = new LineWall(2, 2, position)
    scene.add(lineWall.cylinder)
    eventListMesh.value.push(lineWall)

  },
  '治安': (position) => {
    // 飞线
    const flyLineShader = new FlyLineShader(position);
    scene.add(flyLineShader.mesh);
    eventListMesh.value.push(flyLineShader)
  },
  '电力': (position) => {
    // 雷达
    const lineRader = new LineRader(position)
    scene.add(lineRader.mesh);
    eventListMesh.value.push(lineRader)
  }
}

watch(
  () => props.listInfos,
  (val) => {
    console.log(val);
    eventListMesh.value.forEach(item => {
      item.remove()
    })
    props.listInfos.forEach(item => {
      console.log(item);
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10
      }
      const alarmSprite = new AlarmSprite(item.name, position)
      console.log(alarmSprite);
      alarmSprite.onClick(() => {
        console.log('点击事件');
      })
      eventListMesh.value.push(alarmSprite)
      // 光墙
      if (mapFn[item.name]) {
        mapFn[item.name](position)

      }

      // console.log(eventListMesh);
      scene.add(alarmSprite.mesh)
    });
  }
)
</script>

<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<style lang="less" scoped>
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
