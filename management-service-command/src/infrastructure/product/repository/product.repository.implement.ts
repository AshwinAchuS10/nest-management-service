import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'domain/product/product.impl';
import { ProductRepository } from 'domain/product/product.repository';
import { Model } from 'mongoose';
import { IProductSchema } from '../entity/product.entity';


export class ProductRepositoryImplement implements ProductRepository {

  constructor(@InjectModel('Product')
  private readonly productModel: Model<IProductSchema>) { }

  async save(product: Product | Product[]): Promise<any> {
    const productModel = new this.productModel(product);
    return await productModel.save();
  }

  async delete(productId: string): Promise<any> {
    const deletedProduct = this.productModel.deleteOne({_id: productId});
    return deletedProduct;
  }

  async findById(productId: string): Promise<any> {
    const product = this.productModel.findById(productId);
    return product;
  }
}
