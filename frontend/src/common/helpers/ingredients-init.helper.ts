export class Ingredients {
  mushrooms = 0;
  cheddar = 0;
  salami = 0;
  ham = 0;
  ananas = 0;
  bacon = 0;
  onion = 0;
  chile = 0;
  jalapeno = 0;
  olives = 0;
  tomatoes = 0;
  salmon = 0;
  mozzarella = 0;
  parmesan = 0;
  blue_cheese = 0;

  constructor(initialValues: { [key: string]: number } = {}) {
    for (const key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        this[key] = initialValues[key];
      }
    }
  }
}
