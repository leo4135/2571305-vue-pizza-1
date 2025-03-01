<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
          :src="getImage('public/img/product.svg')"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizza.size.name }}, {{ pizza.dough.name }} тесто</li>
          <li>Соус: {{ pizza.sauce.name }}</li>
          <li>
            Начинка:
            {{ pizza.ingredients.map((i) => i.name).join(", ") }}
          </li>
        </ul>
      </div>
    </div>

    <AppCounter
        class="cart-list__counter"
        :value="pizza.quantity"
        accent
        @update:value="onQuantityUpdate"
    />

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
          type="button"
          class="cart-list__edit"
          @click="onEditPizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import AppCounter from "@/common/components/AppCounter.vue";
import { getImage } from "@/common/helpers/get-image";

const props = defineProps({
  pizza: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:quantity', 'editPizza']);

const onQuantityUpdate = (newQuantity) => {
  emit('update:quantity', props.index, newQuantity);
};

const onEditPizza = () => {
  emit('editPizza', props.index);
};
</script>

<style scoped>
.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;
  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
