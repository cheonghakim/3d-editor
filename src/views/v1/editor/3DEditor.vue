<script setup lang="ts">
import ShortCutComp from "@/components/layout/ShortCutComp.vue";

import { useKeyboardEvents } from "@/plugins/keyEvents.ts";

const { downSpace } = useKeyboardEvents();
</script>

<template>
  <div class="d-flex flex-column short-cut" v-if="downSpace">
    <div class="mb-4 line">
      <ShortCutComp></ShortCutComp>
    </div>
  </div>
</template>
