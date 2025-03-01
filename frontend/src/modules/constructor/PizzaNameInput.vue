<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      v-model="name"
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
    />
  </label>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const name = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    return emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip-path: inset(100%);
}
</style>
