import { onMounted, onUnmounted, ref } from "vue";

export function useKeyboardEvents() {
  const downSpace = ref(false);

  const onKeydown = (e: KeyboardEvent) => {
    if (downSpace.value) {
      return;
    }

    const key = e.keyCode;
    if (key === 32) {
      downSpace.value = true;
    }
  };

  const onKeyup = (e: KeyboardEvent) => {
    const key = e.keyCode;

    if (key === 32) {
      downSpace.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeydown);
    window.removeEventListener("keyup", onKeyup);
  });

  return { downSpace };
}
