import { useDataStore } from "@/stores/dataStore";

export const mapIngredientQuantities = (pizza) => {
  const data = useDataStore();
  const ingredientQuantities = {};

  pizza.ingredients.forEach(({ ingredientId, quantity }) => {
    ingredientQuantities[ingredientId] = quantity ?? 0;
  });

  return data.ingredients.reduce((result, { id }) => {
    result[id] = ingredientQuantities[id] || 0;
    return result;
  }, {});
};
