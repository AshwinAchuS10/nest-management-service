import { Logger, Module, Provider } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectionToken } from 'application/product/injection.token';
import { CreateProductHandler } from 'application/product/command/create.product.handler';
import { DeleteProductHandler } from 'application/product/command/delete.product.handler';
import { UpdateProductHandler } from 'application/product/command/update.product.handler';
import { MongooseConfigService } from 'configuration/mongoose-config.service';
import { ProductFactory } from 'domain/product/product.factory';
import { ProductSchema } from 'infrastructure/product/entity/product.entity';
import { ProductRepositoryImplement } from 'infrastructure/product/repository/product.repository.implement';
import { ProductController } from 'controllers/product.controller';

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.PRODUCT_REPOSITORY,
        useClass: ProductRepositoryImplement,
    }
];

const application: Array<any> = [
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler
];

const domain: Array<any> = [
    ProductFactory
];

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema
            }
        ])
    ],
    controllers: [
        ProductController
    ],
    providers: [Logger, ...infrastructure, ...application, ...domain]
})
export class ProductModule {}
