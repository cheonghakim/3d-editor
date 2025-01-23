<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Camera, Mesh, Object3D, Renderer, Scene } from "@/editor/index.ts";

const editor3D = ref();

onMounted(() => {
  const renderer = new Renderer(editor3D.value);
  console.log(renderer);
});
</script>

<template>
  <div class="window-view">
    <canvas ref="editor3D"></canvas>
  </div>
</template>
