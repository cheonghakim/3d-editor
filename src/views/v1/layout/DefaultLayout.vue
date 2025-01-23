<script setup lang="ts">
import HeaderComp from "@/components/layout/HeaderComp.vue";
import SideNavComp from "@/components/layout/SideNavComp.vue";
import ShortCutComp from "@/components/layout/ShortCutComp.vue";
import WindowView from "@/views/v1/window/WindowView.vue";

import { useKeyboardEvents } from "@/plugins/keyEvents.ts";

const { downSpace } = useKeyboardEvents();
</script>

<template>
  <div id="layoutRoot">
    <HeaderComp></HeaderComp>
    <div class="content-area d-flex">
      <SideNavComp></SideNavComp>

      <WindowView></WindowView>
    </div>

    <div class="d-flex flex-column short-cut" v-if="downSpace">
      <div class="mb-4 line">
        <ShortCutComp></ShortCutComp>
      </div>
    </div>
  </div>
</template>
