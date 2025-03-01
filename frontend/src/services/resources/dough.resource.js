import { CrudService } from "@/services/crud.service";

export class DoughResource extends CrudService {
  constructor() {
    super("dough");
  }

  getDoughs() {
    return this.get();
  }
}
