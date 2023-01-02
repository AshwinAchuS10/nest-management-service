import { Logger, Module, Provider } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCategoryHandler } from 'application/category/command/create.category.handler';
import { InjectionToken } from 'application/category/injection.token';
import { FindCategoryHandler } from 'application/category/query/find.category.handler';
import { MongooseConfigService } from 'configuration/mongoose-config.service';
import { CategorysController } from 'controllers/category.controller';
import { CategoryFactory } from 'domain/category/category.factory';
import { CategoryQueryImplement } from 'infrastructure/category/query/category.query.implement';
import { CategoryRepositoryImplement } from 'infrastructure/category/repository/category.repository.implement';
import { CategorySchema } from 'infrastructure/category/entity/category.entity';

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.CATEGORY_REPOSITORY,
        useClass: CategoryRepositoryImplement
    },
    {
        provide: InjectionToken.CATEGORY_QUERY,
        useClass: CategoryQueryImplement
    }
];

const application = [CreateCategoryHandler, FindCategoryHandler];

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
export class CategoryModule {}
