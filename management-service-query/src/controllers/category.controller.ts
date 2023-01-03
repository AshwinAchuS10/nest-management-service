import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ApiTags } from '@nestjs/swagger';
import { FindCategoryQuery } from 'application/category/query/find.category.query';
import { CATEGORY_GET_FAILED, CATEGORY_GET_SUCCESS } from 'constant/category.messages';
import { Category } from 'domain/category/request/category.request';
import { CategoryResponse } from 'domain/category/response/category.response';

@ApiTags('categories')
@Controller('categories')
export class CategorysController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

    @Get('/')
    async findCategoryById(@Body() body: any): Promise<CategoryResponse> {
        let result;
        try {
            let category: Category = await this.queryBus.execute(new FindCategoryQuery(body._id));
            result = {
                status: HttpStatus.OK,
                message: CATEGORY_GET_SUCCESS,
                data: { category },
                errors: null
            };
        } catch (error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: CATEGORY_GET_FAILED,
                data: null,
                errors: [error?.message]
            };
        }
        return result;
    }
}
