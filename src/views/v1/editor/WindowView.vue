<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Camera,
  Mesh,
  Object3D,
  Renderer,
  Scene,
  Mat2,
  Vector2,
} from "@/editor/index.ts";

const editor3D = ref();

onMounted(() => {
  const renderer = new Renderer(editor3D.value);
  console.log(renderer);

  console.log(new Mat2([1, 2, 3, 4]));
});
</script>

<template>
  <div class="window-view">
    <canvas ref="editor3D"></canvas>
  </div>
</template>
