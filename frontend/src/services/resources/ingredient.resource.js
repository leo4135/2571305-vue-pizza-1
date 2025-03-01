import { CrudService } from "@/services/crud.service";

export class IngredientResource extends CrudService {
  constructor() {
    super("ingredients");
  }

  getIngredients() {
    return this.get();
  }
}
