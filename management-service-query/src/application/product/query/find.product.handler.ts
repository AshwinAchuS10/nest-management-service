import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../injection.token';
import { ProductQuery } from './product.query';
import { FindProductQuery } from './find.product.query';
import { FindProductResult } from './find.product.result';

@QueryHandler(FindProductQuery)
export class FindProductHandler implements IQueryHandler<FindProductQuery, FindProductResult> {
  @Inject(InjectionToken.PRODUCT_QUERY) readonly productQuery: ProductQuery;

  async execute(query: FindProductQuery): Promise<FindProductResult> {
    console.log("query: ", query);
    const data = await this.productQuery.findById(query._id);
    if (!data) throw new NotFoundException('PRODUCT_NOT_FOUND');

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindProductResult());

    if (dataKeys.length < resultKeys.length) throw new InternalServerErrorException();

    if (resultKeys.find(resultKey => !dataKeys.includes(resultKey))) throw new InternalServerErrorException();

    return data;
  }
}
