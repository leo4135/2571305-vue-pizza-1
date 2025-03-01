<template>
  <form class="address-form address-form--opened sheet" @submit.prevent="save">
    <div class="address-form__header">
      <b>{{ title }}</b>
    </div>

    <div class="address-form__wrapper">
      <InputField
          v-model="name"
          label="Название адреса"
          name="addr-name"
          placeholder="Введите название адреса"
          required
      />
      <InputField
          v-model="street"
          label="Улица"
          name="addr-street"
          placeholder="Введите название улицы"
          sizeClass="address-form__input--size--normal"
          required
      />
      <InputField
          v-model="building"
          label="Дом"
          name="addr-house"
          placeholder="Введите номер дома"
          sizeClass="address-form__input--size--small"
          required
      />
      <InputField
          v-model="flat"
          label="Квартира"
          name="addr-apartment"
          placeholder="Введите № квартиры"
          sizeClass="address-form__input--size--small"
      />
      <InputField
          v-model="comment"
          label="Комментарий"
          name="addr-comment"
          placeholder="Введите комментарий"
      />
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="emit('delete')"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import InputField from "@/common/components/address/InputField.vue";

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["delete", "save"]);

const name = ref(props.address?.name ?? "");
const street = ref(props.address?.street ?? "");
const building = ref(props.address?.building ?? "");
const flat = ref(props.address?.flat ?? "");
const comment = ref(props.address?.comment ?? "");

const save = () => {
  emit("save", {
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}
.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
</style>
