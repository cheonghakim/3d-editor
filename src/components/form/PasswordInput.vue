<script lang="ts" setup>
import { onUnmounted, ref, toRefs, watch, type Ref } from "vue";

const props = defineProps({
  initData: {
    required: true,
    type: null,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "비밀번호",
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: String,
    default: "32",
  },
  customClass: {
    type: String,
    default: "",
  },
  customIconClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["updatePassword", "onKeydown", "onEnter"]);

const {
  initData: _initData,
  readOnly: _readOnly,
  placeholder: _placeholder,
  isInvalid: _isInvalid,
  maxlength: _maxlength,
  customClass: _customClass,
  customIconClass: _customIconClass,
} = toRefs(props);

const _password: Ref<undefined | string> = ref(undefined);
const _showStr = ref(false);

const stopWatching1 = watch(
  () => _initData.value,
  (val) => {
    _password.value = val;
  },
  { immediate: true }
);

onUnmounted(() => {
  stopWatching1();
});

const changePassword = (): void => {
  emit("updatePassword", _password.value);
};

const changeShowStr = (): void => {
  _showStr.value = !_showStr.value;
};

const onKeydown = (evt: any): void => {
  emit("onKeydown", evt);
};

const onEnter = (evt: any): void => {
  emit("onEnter", evt);
};
</script>

<template>
  <div>
    <div v-if="!_showStr" class="parent-btn">
      <form @submit.prevent>
        <input
          type="password"
          v-model="_password"
          class="form-control w-100"
          :placeholder="_placeholder"
          :readonly="_readOnly"
          :class="{
            'is-invalid': _isInvalid,
            [customClass]: true,
          }"
          :maxlength="_maxlength"
          autocomplete="off"
          @input="changePassword"
          @keydown.enter="onEnter"
          @keydown="onKeydown"
        />
      </form>
      <div
        @click.stop="changeShowStr"
        class="child-btn btn"
        :class="{ reposition: _isInvalid, [_customIconClass]: true }"
      >
        <i class="mdi mdi-eye"></i>
      </div>
    </div>

    <div v-else class="parent-btn">
      <input
        type="text"
        v-model="_password"
        @input="changePassword"
        @keydown.enter="onEnter"
        @keydown="onKeydown"
        class="form-control w-100"
        :placeholder="_placeholder"
        :readonly="_readOnly"
        :class="{
          'is-invalid': _isInvalid,
          [_customClass]: true,
        }"
        :maxlength="_maxlength"
        autocomplete="off"
      />
      <div
        @click.stop="changeShowStr"
        class="child-btn btn"
        :class="{ reposition: _isInvalid, [_customIconClass]: true }"
      >
        <i class="mdi mdi-eye-off text-danger"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent-btn {
  position: relative !important;
}

.child-btn {
  position: absolute !important;
  right: 0px;
  top: 0px;
}

.reposition {
  right: 5%;
}
</style>
