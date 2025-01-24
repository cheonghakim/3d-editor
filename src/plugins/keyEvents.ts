import { onMounted, onUnmounted, ref, type Ref } from "vue";

type TKeyboardEventsReturn = { downSpace: Ref<boolean, boolean> };

type FKeyboardEvents = () => TKeyboardEventsReturn;

function useKeyboardEvents(): TKeyboardEventsReturn {
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

export { type TKeyboardEventsReturn, type FKeyboardEvents, useKeyboardEvents };
