<script setup lang="ts">
import { reactive, ref } from "vue";
import { DockMenu } from "vue-dock-menu/dist/vue-dock-menu.js";

const callbackSelectMenu = ({
  name,
  path,
  url,
}: {
  name: string;
  path: string;
  url: string;
}) => {
  console.log(name, path, url);
};

const _theme = reactive({
  primary: "#454545",
  secondary: "#454545",
  tertiary: "#454545",
  textColor: "#fff",
  textHoverColor: "#fff",
});

const list = ref([
  {
    name: "File",
    menu: [{ name: "Open" }, { name: "New Window" }, { name: "Exit" }],
    icon: "",
  },
  {
    name: "Edit",
    menu: [{ name: "Cut" }, { name: "Copy" }, { name: "Paste" }],
    icon: "",
  },
]);
</script>

<template>
  <dock-menu
    :draggable="false"
    :items="list"
    :dock="'TOP'"
    :on-selected="callbackSelectMenu"
    :theme="_theme"
    :showIcon="false"
    :middle-custom-class="'flex-1 '"
    :custom-class="'d-flex justify-space-between flex-1'"
  >
    <template v-slot:title>
      <div class="menu-top-title clickable px-3">
        <i class="mdi mdi-cube-outline"></i>
      </div>
    </template>
  </dock-menu>
</template>
