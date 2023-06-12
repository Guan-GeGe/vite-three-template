<script setup>
import AlarmSprite from '@/three/mesh/AlarmSprite.js'
import '@/three/init.js'
import LineWall from '../three/mesh/LineWall';
import FlyLineShader from '@/three/mesh/FlyLineShader.js'
import LineRader from '@/three/mesh/LineRader.js'
import { ref } from 'vue';
import eventHub from '../utils/eventHub';
import gsap from 'gsap'
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
  '火警': (position, i) => {
    // 创建光墙
    const lineWall = new LineWall(2, 2, position)
    lineWall.eventListIndex = i
    scene.add(lineWall.mesh)
    eventListMesh.value.push(lineWall)

  },
  '治安': (position, i) => {
    // 飞线
    const flyLineShader = new FlyLineShader(position);
    flyLineShader.eventListIndex = i

    scene.add(flyLineShader.mesh);
    eventListMesh.value.push(flyLineShader)
  },
  '电力': (position, i) => {
    // 雷达
    const lineRader = new LineRader(position)
    lineRader.eventListIndex = i

    scene.add(lineRader.mesh);
    eventListMesh.value.push(lineRader)
  }
}

eventHub.on('toggleEventClick', (data) => {
  // console.log(eventListMesh.value);
  eventListMesh.value.forEach((item, index) => {
    // console.log(item);
    if (item.eventListIndex == data.index) {
      item.mesh.visible = true
    } else {
      item.mesh.visible = false
    }
  })
  console.log(props.listInfos[data.index]);
  let position = {
    x: props.listInfos[data.index].position.x / 5 - 10,
    y: 0,
    z: props.listInfos[data.index].position.y / 5 - 10,
  }
  // let positionmesh = eventListMesh.value[data.index].mesh.position
  // 移动轨道控制器进行视角的控制


  // 给移动视角添加动画
  gsap.to(controls.target, {
    x: position.x,
    y: position.y,
    z: position.z,
    duration: 1,
  })
  // controls.target.set(position.x, position.y, position.z);

  // 写更新，不然更新不到
  controls.update()
})

watch(
  () => props.listInfos,
  (val) => {
    // console.log(val);
    eventListMesh.value.forEach(item => {
      item.remove()
    })
    props.listInfos.forEach((item, i) => {
      // console.log(item);
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10
      }
      const alarmSprite = new AlarmSprite(item.name, position)
      // console.log(alarmSprite);
      alarmSprite.onClick(() => {
        // 监听点击事件，用来查看是谁被点击了，来高亮数据
        eventHub.emit('spriteClick', { event: item, i })
      })
      // 给每个材质添加一个唯一的标识
      alarmSprite.eventListIndex = i
      eventListMesh.value.push(alarmSprite)
      // 光墙
      if (mapFn[item.name]) {
        mapFn[item.name](position, i)

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
