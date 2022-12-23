import { Category } from './category.impl';

export interface CategoryRepository {
  save: (category: Category | Category[]) => Promise<Category>;
}
