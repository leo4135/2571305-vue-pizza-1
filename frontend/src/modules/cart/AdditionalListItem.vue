<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
          :src="getImage(misc.image)"
          width="39"
          height="60"
          :alt="misc.name"
      />
      <span>{{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppCounter
          class="additional-list__counter"
          :value="misc.quantity"
          accent
          :min="0"
          :max="15"
          @update:value="onQuantityUpdate"
      />

      <div class="additional-list__price">
        <b>× {{ misc.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import AppCounter from "@/common/components/AppCounter.vue";
import { getImage } from "@/common/helpers/get-image";

const props = defineProps({
  misc: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:quantity']);

const onQuantityUpdate = (newQuantity) => {
  emit('update:quantity', props.misc.id, newQuantity);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0 0 8px;
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
