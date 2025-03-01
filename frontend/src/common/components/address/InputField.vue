<template>
  <div :class="['address-form__input', sizeClass]">
    <label class="input">
      <span>{{ label }}*</span>
      <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :required="required"
      />
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  sizeClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<style lang="scss" scoped>
.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size--normal {
    width: 60.5%;
  }

  &--size--small {
    width: 18%;
  }

  .address-form__input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>