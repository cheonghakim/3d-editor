<script setup lang="ts">
import HeaderComp from "@/components/layout/HeaderComp.vue";
import SideNavComp from "@/components/layout/SideNavComp.vue";
import WindowView from "@/views/v1/window/WindowView.vue";
</script>

<template>
  <div id="layoutRoot">
    <HeaderComp></HeaderComp>
    <div class="content-area d-flex">
      <SideNavComp></SideNavComp>

      <WindowView></WindowView>
    </div>

    <slot></slot>
  </div>
</template>
