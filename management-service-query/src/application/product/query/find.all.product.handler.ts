import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../injection.token';
import { ProductQuery } from './product.query';
import { FindProductResult } from './find.product.result';
import { FindAllProductQuery } from './find.all.product.query';

@QueryHandler(FindAllProductQuery)
export class FindAllProductHandler implements IQueryHandler<FindAllProductQuery, FindProductResult[]> {
  @Inject(InjectionToken.PRODUCT_QUERY) readonly productQuery: ProductQuery;

  async execute(): Promise<FindProductResult[]> {
    // console.log("query: ", query);
    const data = await this.productQuery.find();
    if (data.length == 0) throw new NotFoundException('PRODUCT_NOT_FOUND');
    for(let i=0; i<data.length; i++){
        const dataKeys = Object.keys(data[i]);
        const resultKeys = Object.keys(new FindProductResult());

        if (dataKeys.length < resultKeys.length) throw new InternalServerErrorException();

        if (resultKeys.find(resultKey => !dataKeys.includes(resultKey))) throw new InternalServerErrorException();

    }
    return data;
  }
}
