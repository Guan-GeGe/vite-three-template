<script setup>
let dataInfo = ref({
  event: { number: 0 },
  iot: { number: 0 },
  power: { number: 0 },
})
let infos = ref({
  event: {
    name: "未处理治安事件",
    number: 12,
    unit: "起"
  },
  iot: { name: '"接入IOT设备"', number: 25, unit: "台" },
  power: { name: "城市电力能耗", number: 72.22, unit: '"兆瓦时"' },

})
let list = [{ "name": "电力", "type": "存在隐患,需派人排除隐患", "position": { "x": 83, "y": 73 }, "time": "1991-11-15" }, { "name": "电力", "type": "出现事故，需紧急处理", "position": { "x": 73, "y": 51 }, "time": "2000-06-22" }, { "name": "火警", "type": "出现事故，需紧急处理", "position": { "x": 73, "y": 5 }, "time": "1971-08-14" }, { "name": "火警", "type": "出现事故，需紧急处理", "position": { "x": 74, "y": 29 }, "time": "1980-01-21" }, { "name": "电力", "type": "存在隐患,需派人排除隐患", "position": { "x": 9, "y": 54 }, "time": "1995-03-29" }, { "name": "治安", "type": "存在隐患,需派人排除隐患", "position": { "x": 56, "y": 93 }, "time": "2017-07-14" }]
let listInfos = ref()
onMounted(() => {
  changeInfo()
  listInfo()
  // setInterval(() => {
  // changeInfo()
  // listInfo()
  // }, 500000);
})

const changeInfo = async () => {
  const { data } = await getSmartcity()
  console.log(data);
  for (let i in infos.value) {
    dataInfo.value[i].name = infos.value[i].name
    dataInfo.value[i].unit = infos.value[i].unit
    gsap.to(dataInfo.value[i], {
      number: infos.value[i].number,
      duration: 1,
    })
  }

}

const listInfo = async () => {
  const { data } = await getSmartcityList()
  console.log(JSON.stringify(data.list));
  console.log(list);
  listInfos.value = list
  // console.log(listInfos);
}
</script>

<template>
  <Scene :listInfos=listInfos></Scene>

  <BigScreen :dataInfo=dataInfo :listInfos=listInfos></BigScreen>
</template>

<style scoped lang="less"></style>
