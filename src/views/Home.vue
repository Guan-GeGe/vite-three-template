<script setup>
let dataInfo = ref({
  event: { number: 0 },
  iot: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
})


let listInfos = ref()
onMounted(() => {
  changeInfo()
  listInfo()
  setInterval(() => {
    changeInfo()
    listInfo()
  }, 5000);
})

const changeInfo = async () => {
  const { data } = await getSmartcity()
  // console.log(data);
  for (let i in data.data) {
    dataInfo.value[i].name = data.data[i].name
    dataInfo.value[i].unit = data.data[i].unit
    gsap.to(dataInfo.value[i], {
      number: data.data[i].number,
      duration: 1,
    })
  }

}

const listInfo = async () => {
  const { data } = await getSmartcityList()
  // console.log(data);
  listInfos.value = data.list
  // console.log(listInfos);
}
</script>

<template>
  <Scene :listInfos=listInfos></Scene>

  <BigScreen :dataInfo=dataInfo :listInfos=listInfos></BigScreen>
</template>

<style scoped lang="less"></style>
