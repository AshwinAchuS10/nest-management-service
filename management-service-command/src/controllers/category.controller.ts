import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryCommand } from 'application/category/command/create.category.command';
import logger from 'configuration/logger.service';
import { CATEGORY_CREATE_FAILED, CATEGORY_CREATE_SUCCESS } from 'constant/category.messages';
import { Category } from 'domain/category/request/category.request';
import { CategoryResponse } from 'domain/category/response/category.response';

@ApiTags('categories')
@Controller('categories')
export class CategorysController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

    @Post('/')
    @ApiCreatedResponse({
        type: CategoryResponse
    })
    async createCategory(@Body() body: Category): Promise<CategoryResponse> {
        let result;
        console.log('In Category Controller Console');
        logger.log.debug('In Category Controller');
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
}
