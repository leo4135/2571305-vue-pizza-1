import doughSizes from "@/common/data/doughSizes";
import ingredients from "@/common/data/ingredients";
import sauces from "@/common/data/sauces";
import sizes from "@/common/data/sizes";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughSizes[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    value: ingredients[ingredient.id],
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    value: sauces[sauce.id],
  };
};

export const fixItems = (items, normalizeItem) => {
  const fixedItems = [];
  const itemNames = new Set();

  for (const item of items) {
    if (!itemNames.has(item.name)) {
      itemNames.add(item.name);
      const normalizedItem =
        typeof normalizeItem === "function" ? normalizeItem(item) : item;
      fixedItems.push(normalizedItem);
    }
  }

  return fixedItems;
};
