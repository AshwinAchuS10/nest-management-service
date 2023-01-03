import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductQuery } from 'application/product/query/product.query';
import { Model } from 'mongoose';
import { IProductSchema } from '../entity/product.entity';

@Injectable()
export class ProductQueryImplement implements ProductQuery {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<IProductSchema>
  ) {}

  async findById(id: string): Promise<any> {
    let product = await this.productModel.findById(id).exec();
    return product;
  }

  async find(): Promise<any> {
    let product = await this.productModel.find({}).exec();
    return product;
  }
}
