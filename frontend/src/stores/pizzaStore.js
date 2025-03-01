import { defineStore } from "pinia";
import { mapIngredientQuantities } from "@/common/helpers/ingredient-quantities.helper";
import { getPizzaPrice } from "@/common/helpers/price";
import { useDataStore } from "@/stores/dataStore";

const getItemByIdOrDefault = (dataArray, id) => {
  return dataArray.find((item) => item.id === id) ?? dataArray[0];
};

export const usePizzaStore = defineStore("pizzaStore", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  }),

  getters: {
    getDataStore: () => useDataStore(),

    sauce: (state) =>
      getItemByIdOrDefault(useDataStore().sauces, state.sauceId),
    dough: (state) =>
      getItemByIdOrDefault(useDataStore().doughs, state.doughId),
    size: (state) => getItemByIdOrDefault(useDataStore().sizes, state.sizeId),

    ingredientsExtended: (state) => {
      const pizzaIngredientsIds = new Set(
        state.ingredients.map((i) => i.ingredientId),
      );
      const ingredientsMap = new Map(
        state.ingredients.map((i) => [i.ingredientId, i.quantity]),
      );

      return useDataStore()
        .ingredients.filter((i) => pizzaIngredientsIds.has(i.id))
        .map((i) => ({
          ...i,
          quantity: ingredientsMap.get(i.id) ?? 0,
        }));
    },

    price: (state) => getPizzaPrice(state),
    ingredientQuantities: (state) => mapIngredientQuantities(state),
  },

  actions: {
    setIndex(index) {
      this.index = index;
    },

    setName(name) {
      this.name = name;
    },

    setSauce(sauceId) {
      this.sauceId = sauceId;
    },

    setDough(doughId) {
      this.doughId = doughId;
    },

    setSize(sizeId) {
      this.sizeId = sizeId;
    },

    setIngredients(ingredients) {
      this.ingredients = ingredients;
    },

    addIngredient(ingredientId) {
      this.ingredients.push({
        ingredientId,
        quantity: 1,
      });
    },

    incrementIngredientQuantity(ingredientId) {
      const ingredient = this.ingredients.find(
        (item) => item.ingredientId === ingredientId,
      );

      if (ingredient) {
        ingredient.quantity++;
      } else {
        this.addIngredient(ingredientId);
      }
    },

    setIngredientQuantity(ingredientId, count) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId,
      );

      if (ingredientIdx === -1) {
        if (count > 0) {
          this.addIngredient(ingredientId);
        }
        return;
      }

      if (count === 0) {
        this.ingredients.splice(ingredientIdx, 1);
      } else {
        this.ingredients[ingredientIdx].quantity = count;
      }
    },

    removeIngredient(ingredientId) {
      const index = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId,
      );
      if (index !== -1) {
        this.ingredients.splice(index, 1);
      }
    },

    loadPizza(pizza) {
      this.index = pizza.index;
      this.name = pizza.name;
      this.sauceId = pizza.sauceId;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
    },
  },
});
