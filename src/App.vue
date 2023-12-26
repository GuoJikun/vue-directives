<script setup lang="ts">
import { vResize, vFocus } from './directives/index'
const callback = (e: any) => {
  console.log(e)
}
</script>

<template>
  <div>
    <textarea v-resize.resizeObserve="callback"></textarea>
    <input type="text" v-focus />
  </div>
</template>

<style scoped>
input {
  line-height: 32px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.2s ease-in-out;
}
input:focus {
  border: 1px solid red;
}
</style>
