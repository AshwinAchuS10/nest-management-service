import { Product } from "./product.impl";

export interface ProductRepository {
  save: (product: Product | Product[]) => Promise<Product>;
  delete: (productId: string) => Promise<Product>;
  findById: (productId: string) => Promise<Product>;
}
