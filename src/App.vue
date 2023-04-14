<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()


</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="less"></style>
