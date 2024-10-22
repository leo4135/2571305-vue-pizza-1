<script setup>
import dough from '../mocks/dough.json';
import sizes from '../mocks/sizes.json';
import ingredients from '../mocks/ingredients.json';
import sauces from '../mocks/sauces.json'


</script>

<template>

<main class="content">
<form action="#" method="post">

<div class="content__wrapper">
  <h1 class="title title--big">Конструктор пиццы</h1>

  <div class="content__dough">

    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label  v-for="item in dough" :key="item.id" :class="item.name == 'Тонкое' ? 'dough__input dough__input--light' : 'dough__input dough__input--large'">
          <input type="radio" name="dought" :value="item.name == 'Тонкое' ? 'light' : 'large'" class="visually-hidden" :checked="item.name == 'Тонкое'">
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>

    </div>

  </div>

  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">

        <label v-for="size in sizes" :key="size.id" :class="size.multiplier === 1 ? 'diameter__input diameter__input--small' : size.multiplier === 2 ? 'diameter__input diameter__input--normal' : 'diameter__input diameter__input--big'">
          <input type="radio" name="diameter" :value="size.multiplier === 1 ? 'small' : size.multiplier === 2 ? 'normal' : 'big'" class="visually-hidden" :checked="size.multiplier === 1">
          <span>{{ size.name }}</span>
        </label>

      </div>
    </div>
  </div>

  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">

        <div class="ingredients__sauce">
          <p style="padding: 0;">Основной соус:</p>

          <label v-for="sauce in sauces" class="radio ingredients__input">
            <input type="radio" name="sauce" :checked='sauce.name === "Томатный"' :value="sauce.name === 'Томатный' ? 'tomato' : 'creamy'">
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p style="text-align: unset; padding: 0;">Начинка:</p>

          <ul class="ingredients__list">
            <li v-for="ingredient in ingredients" class="ingredients__item">
              <span :class="'filling filling--' + ingredient.image.split('/')[1].split('.')[0]">{{ ingredient.name }}</span>

              <div class="counter counter--orange ingredients__counter">
                <button type="button" class="counter__button counter__button--minus" disabled>
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input type="text" name="counter" class="counter__input" value="0">
                <button type="button" class="counter__button counter__button--plus">
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          
          </ul>

        </div>

      </div>
    </div>
  </div>

  <div class="content__pizza">

    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input type="text" name="pizza_name" placeholder="Введите название пиццы">
    </label>

    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p style="padding: 0;">Итого: 0 ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>

  </div>

</div>

</form>

</main>
</template>

<style lang="scss">

</style>