import { FindCategoryResult } from './find.category.result';

export interface CategoryQuery {
  findById: (id: string) => Promise<FindCategoryResult | null>;
}
