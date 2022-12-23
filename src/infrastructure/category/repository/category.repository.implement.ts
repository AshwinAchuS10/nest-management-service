import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'domain/category/category.impl';
import { CategoryRepository } from 'domain/category/category.repository';
import { Model } from 'mongoose';
import { ICategorySchema } from '../entity/category.entity';


export class CategoryRepositoryImplement implements CategoryRepository {

  constructor(@InjectModel('Category')
  private readonly categoryModel: Model<ICategorySchema>) { }

  async save(category: Category | Category[]): Promise<any> {
    const categoryModel = new this.categoryModel(category);
    return await categoryModel.save();
  }
}
