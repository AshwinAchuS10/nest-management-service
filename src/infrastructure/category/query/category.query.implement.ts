import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryQuery } from 'application/category/query/category.query';
import { Model } from 'mongoose';
import { ICategorySchema } from '../entity/category.entity';


@Injectable()
export class CategoryQueryImplement implements CategoryQuery {

  constructor(@InjectModel('Category')
  private readonly categoryModel: Model<ICategorySchema>) { }

  async findById(id: string): Promise<any> {
    let category = await this.categoryModel.findById(id).exec();
    return category;
  }
}
