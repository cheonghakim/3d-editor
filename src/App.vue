<script setup lang="ts">
import HeaderComp from "@/components/layout/HeaderComp.vue";
import SideNavComp from "@/components/layout/SideNavComp.vue";
import WindowView from "@/view/v1/window/WindowView.vue";

import { ref } from "vue";

const downSpace = ref(false);

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (!downSpace.value) {
    return;
  }

  const key = e.keyCode;
  if (key === 32) {
    downSpace.value = true;
    console.log("open!");
  }
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
  const key = e.keyCode;

  if (key === 32) {
    console.log("close!");
    downSpace.value = false;
  }
});
</script>

<template>
  <div id="layoutRoot">
    <HeaderComp></HeaderComp>
    <div class="content-area d-flex">
      <SideNavComp></SideNavComp>

      <WindowView></WindowView>
    </div>
  </div>
</template>
