import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryCommand } from 'application/category/command/create.category.command';
import { FindCategoryQuery } from 'application/category/query/find.category.query';
import logger from 'configuration/logger.service';
import {
    CATEGORY_CREATE_FAILED,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_GET_FAILED,
    CATEGORY_GET_SUCCESS
} from 'constants/category.messages';
import { Category } from 'domain/category/request/category.request';
import { CategoryResponse } from 'domain/category/response/category.response';

@ApiTags('categories')
@Controller('categories')
export class CategorysController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

    @Post('/')
    @ApiCreatedResponse({
        type: CategoryResponse
    })
    async createCategory(@Body() body: Category): Promise<CategoryResponse> {
        let result;
        logger.log.debug("In Category Controller");
        try {
            const command = new CreateCategoryCommand(
                body.name,
                body.description,
                body.status,
                body.ownerId,
                body.tags
            );
            let category: Category = await this.commandBus.execute(command);
            result = {
                status: HttpStatus.CREATED,
                message: CATEGORY_CREATE_SUCCESS,
                data: { category },
                errors: null
            };
            return result;
        } catch (error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: CATEGORY_CREATE_FAILED,
                data: null,
                errors: [error?.message]
            };
            throw error;
        }
    }

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
