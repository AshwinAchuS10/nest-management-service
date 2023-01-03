import { Logger, Module, Provider } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCategoryHandler } from 'application/category/command/create.category.handler';
import { InjectionToken } from 'application/category/injection.token';
import { MongooseConfigService } from 'configuration/mongoose-config.service';
import { CategorysController } from 'controllers/category.controller';
import { CategoryFactory } from 'domain/category/category.factory';
import { CategorySchema } from 'infrastructure/category/entity/category.entity';
import { CategoryRepositoryImplement } from 'infrastructure/category/repository/category.repository.implement';

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.CATEGORY_REPOSITORY,
        useClass: CategoryRepositoryImplement
    },
];

const application = [CreateCategoryHandler];

const domain = [CategoryFactory];

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        MongooseModule.forFeature([
            {
                name: 'Category',
                schema: CategorySchema
            }
        ])
    ],
    controllers: [CategorysController],
    providers: [Logger, ...infrastructure, ...application, ...domain]
})
export class CategoryModule { }
