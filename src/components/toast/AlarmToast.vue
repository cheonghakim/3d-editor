<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { eventBus$ } from "@/main";
import { isEmpty } from "@/plugins/utils.ts";
import { useToastController, Components } from "bootstrap-vue-next";

const { BToastOrchestrator } = Components;
const success$ = new Subject();
const warning$ = new Subject();
const msg$ = new Subject();
const error$ = new Subject();
const alarm$ = new Subject();
const _msgList: Ref<any> = ref([]);
const _errorList: Ref<any> = ref([]);
const _successList: Ref<any> = ref([]);
const _warningList: Ref<any> = ref([]);
const _alarmList: Ref<any> = ref([]);

const { show } = useToastController();

msg$.pipe(debounceTime(300)).subscribe(() => {
  const set = new Set(_msgList.value);
  for (let message of set as any) {
    show?.({
      props: {
        title: "시스템 메세지",
        variant: "info",
        pos: "top-center",
        value: 1000 * 10,
        progressProps: {
          variant: "info",
        },
        body: message,
      },
    });
  }
  _msgList.value = [];
});

error$.pipe(debounceTime(300)).subscribe(() => {
  const set = new Set(_errorList.value);
  for (let message of set as any) {
    const typeCheck = typeof message === "object";

    show?.({
      props: {
        title: "에러 메세지",
        variant: "danger",
        pos: "top-center",
        value: 1000 * 10,
        progressProps: {
          variant: "danger",
        },
        body: typeCheck ? message.message : message,
      },
    });
    console.error(message); // 에러 메세지 확인하려고 넣어둠 => 프로덕션에서 삭제
  }
  _errorList.value = [];
});

success$.pipe(debounceTime(300)).subscribe(() => {
  const set = new Set(_successList.value);
  for (let message of set as any) {
    show?.({
      props: {
        title: "성공 메세지",
        variant: "success",
        pos: "top-center",
        value: 1000 * 10,
        progressProps: {
          variant: "success",
        },
        body: message,
      },
    });
  }
  _successList.value = [];
});

warning$.pipe(debounceTime(300)).subscribe(() => {
  const set = new Set(_warningList.value);
  for (let message of set as any) {
    show?.({
      props: {
        title: "경고 메세지",
        variant: "warning",
        pos: "top-center",
        value: 1000 * 10,
        progressProps: {
          variant: "warning",
        },
        body: message,
      },
    });
  }
  _warningList.value = [];
});

alarm$.pipe(debounceTime(300)).subscribe(() => {
  const set = new Set(
    _alarmList.value.map((item: { content: string; title: string }) =>
      JSON.stringify(item)
    )
  );

  for (let message of set as any) {
    const parsedMsg = JSON.parse(message);
    const content = parsedMsg.content;
    const title = parsedMsg.title;
    show?.({
      props: {
        title,
        variant: "secondary",
        pos: "bottom-end",
        value: 1000 * 10,
        progressProps: {
          variant: "secondary",
        },
        body: content,
      },
    });
  }
  _warningList.value = [];
});

// 메세지 이벤트 정의
const messageCallback = (message: any) => {
  if (isEmpty(message)) return;
  _msgList.value.push(message);
  msg$.next(message);
};
const errorCallback = (message: any) => {
  if (isEmpty(message)) return;
  _errorList.value.push(message);
  error$.next(message);
};
const successCallback = (message: any) => {
  if (isEmpty(message)) return;
  _successList.value.push(message);
  success$.next(message);
};
const warningCallback = (message: any) => {
  if (isEmpty(message)) return;
  _warningList.value.push(message);
  warning$.next(message);
};
const alarmCallback = (message: any) => {
  if (isEmpty(message)) return;
  _alarmList.value.push(message);
  alarm$.next(message);
};

// 이벤트 리스너 등록
onMounted(() => {
  eventBus$.$on("info", messageCallback);
  eventBus$.$on("error", errorCallback);
  eventBus$.$on("success", successCallback);
  eventBus$.$on("warning", warningCallback);
  eventBus$.$on("alarm", alarmCallback);
});

// 마운트 해제시 이벤트 리스너 해제
onBeforeUnmount(() => {
  msg$?.unsubscribe();
  error$?.unsubscribe();
  success$?.unsubscribe();
  warning$?.unsubscribe();
  alarm$?.unsubscribe();

  eventBus$.$off("info");
  eventBus$.$off("error");
  eventBus$.$off("success");
  eventBus$.$off("warning");
  eventBus$.$off("alarm");
});
</script>

<template><BToastOrchestrator></BToastOrchestrator></template>
