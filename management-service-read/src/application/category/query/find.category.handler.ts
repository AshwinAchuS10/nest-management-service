import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../injection.token';
import { CategoryQuery } from './category.query';
import { FindCategoryQuery } from './find.category.query';
import { FindCategoryResult } from './find.category.result';

@QueryHandler(FindCategoryQuery)
export class FindCategoryHandler implements IQueryHandler<FindCategoryQuery, FindCategoryResult> {
    @Inject(InjectionToken.CATEGORY_QUERY) readonly categoryQuery: CategoryQuery;

    async execute(query: FindCategoryQuery): Promise<FindCategoryResult> {
        const data = await this.categoryQuery.findById(query._id);
        if (!data) throw new NotFoundException('CATEGORY_NOT_FOUND');

        const dataKeys = Object.keys(data);
        const resultKeys = Object.keys(new FindCategoryResult());

        if (dataKeys.length < resultKeys.length) throw new InternalServerErrorException();

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
            throw new InternalServerErrorException();

        return data;
    }
}
