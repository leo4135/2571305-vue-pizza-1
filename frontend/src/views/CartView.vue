<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="submit"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="cartStore.getPizzasExtended.length === 0"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <CartListItem
              v-for="(pizza, i) in cartStore.getPizzasExtended"
              :key="i"
              :pizza="pizza"
              :index="i"
              @update:quantity="cartStore.setPizzaQuantity"
              @editPizza="editPizza"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <AdditionalListItem
                v-for="misc in cartStore.miscExtended"
                :key="misc.id"
                :misc="misc"
                @update:quantity="onMiscQuantityUpdate"
            />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                @input="deliveryOption = $event.target.value"
              >
                <option :value="-2">Заберу сам</option>
                <option :value="-1">Новый адрес</option>
                <option
                  v-for="address in profileStore.addresses"
                  :key="address.id"
                  :value="address.id"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="phone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div v-if="isNewAddress" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input v-model="street" required type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input v-model="building" required type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input v-model="flat" type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.total }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" :disabled="cartStore.total === 0">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { usePizzaStore } from "@/stores/pizzaStore";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import { useAuthStore } from "@/stores/authStore";
import CartListItem from "@/modules/cart/CartListItem.vue";
import AdditionalListItem from "@/modules/cart/AdditionalListItem.vue";

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();

const router = useRouter();
const deliveryOption = ref(-2);
const isNewAddress = computed(() => Number(deliveryOption.value) === -1);
const isNoAddress = computed(() => Number(deliveryOption.value) === -2);
const deliveryAddress = computed(() => {
  if (isNewAddress.value) {
    return null;
  } else {
    const existedAddress =
      profileStore.addresses.find(
        (addr) => addr.id === Number(deliveryOption.value)
      ) ?? null;
    if (existedAddress) {
      cartStore.setAddress(existedAddress);
    }
    return existedAddress;
  }
});

const phone = computed({
  get() {
    return cartStore.phone;
  },
  set(value) {
    cartStore.setPhone(value);
  },
});

const street = computed({
  get() {
    return cartStore.address.street;
  },
  set(value) {
    cartStore.setStreet(value);
  },
});

const building = computed({
  get() {
    return cartStore.address.building;
  },
  set(value) {
    cartStore.setBuilding(value);
  },
});

const flat = computed({
  get() {
    return cartStore.address.flat;
  },
  set(value) {
    cartStore.setFlat(value);
  },
});

const editPizza = async (index) => {
  pizzaStore.loadPizza({
    index,
    ...cartStore.pizzas[index],
  });
  await router.push({ name: "home" });
};

const submit = async () => {
  if (isNoAddress.value) {
    cartStore.unsetAddress();
  } else if (!isNewAddress.value) {
    cartStore.setAddress(deliveryAddress.value);
  }

  const res = await cartStore.publishOrder();
  if (res.__state === "success") {
    authStore.isAuthenticated && (await profileStore.loadOrders());
    await router.push({ name: "success" });
    cartStore.$reset();
  } else if (isNoAddress.value) {
    cartStore.resetAddress();
  }
};

const onMiscQuantityUpdate = (miscId, newQuantity) => {
  cartStore.setMiscQuantity(miscId, newQuantity);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

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

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0 0 8px;
}

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

.select {
  @include r-s16-h19;

  display: block;
  width: 148px;

  margin: 0;
  padding: 8px 30px 8px 16px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.button--arrow::before {
  content: "";
  background-image: url("@/assets/img/button-arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateY(-1px);
}
</style>
