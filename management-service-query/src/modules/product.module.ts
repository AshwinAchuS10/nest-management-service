import { Logger, Module, Provider } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectionToken } from 'application/product/injection.token';
import { FindAllProductHandler } from 'application/product/query/find.all.product.handler';
import { FindProductHandler } from 'application/product/query/find.product.handler';
import { MongooseConfigService } from 'configuration/mongoose-config.service';
import { ProductController } from 'controllers/product.controller';
import { ProductFactory } from 'domain/product/product.factory';
import { ProductSchema } from 'infrastructure/product/entity/product.entity';
import { ProductQueryImplement } from 'infrastructure/product/query/product.query.implement';


const infrastructure: Provider[] = [
  {
    provide: InjectionToken.PRODUCT_QUERY,
    useClass: ProductQueryImplement,
  }
];

const application: Array<any> = [
  FindProductHandler,
  FindAllProductHandler,
];

const domain: Array<any> = [ ProductFactory ];

@Module({
  imports: [CqrsModule, MongooseModule.forRootAsync({
    useClass: MongooseConfigService,
  }),
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema
      }
    ])],
  controllers: [ ProductController ],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ProductModule {
}
