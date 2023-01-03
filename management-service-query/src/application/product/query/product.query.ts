import { FindProductResult } from "./find.product.result";

export interface ProductQuery {
  findById: (id: string) => Promise<FindProductResult | null>;
  find: () => Promise<FindProductResult[] | []>;
}
