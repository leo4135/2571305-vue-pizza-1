<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :data-transfer="ingredient"
          :draggable="values[ingredient.id] < MAX_INGREDIENT_COUNT"
        >
          <div class="filling">
            <img :src="getImage(ingredient.image)" :alt="ingredient.name" />
            {{ ingredient.name }}
          </div>
        </AppDrag>

        <AppCounter
          class="ingredients__counter"
          :value="values[ingredient.id]"
          :min="0"
          :max="MAX_INGREDIENT_COUNT"
          @update:value="updateValue(ingredient.id, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants/constants";
import AppCounter from "@/common/components/AppCounter.vue";
import {getImage} from "@/common/helpers/get-image";

defineProps({
  values: {
    type: Object,
    default: () => ({}),
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update"]);

const setValue = (ingredient, count) => {
  emit("update", ingredient, Number(count));
};

const updateValue = (ingredient, count) => {
  setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
  }
}
</style>
