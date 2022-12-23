import {
  Body, Controller, HttpStatus, Param
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { MessagePattern } from '@nestjs/microservices';
import { CreateCategoryCommand } from 'application/category/command/create.category.command';
import { FindCategoryQuery } from 'application/category/query/find.category.query';
import { CATEGORY_CREATE_FAILED, CATEGORY_CREATE_SUCCESS, CATEGORY_GET_SUCCESS, CATEGORY_GET_FAILED } from 'constants/category.messages';
import { CreateCategory } from 'domain/category/request/category.request';
import { ICategoryResponse } from 'domain/category/response/category.response';

@Controller()
export class CategorysController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @MessagePattern('category_create')
  async createCategory(@Body() body: CreateCategory): Promise<ICategoryResponse> {
    console.log('body: ', body);
    let result;
    try {
      const command = new CreateCategoryCommand(
        body.name, body.description, body.status, body.ownerId, body.tags,
      );
      let category = await this.commandBus.execute(command);
      result = {
        status: HttpStatus.CREATED,
        message: CATEGORY_CREATE_SUCCESS,
        category: category,
        errors: null,
      };
      return result;
    } catch (error: any) {
      result = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: CATEGORY_CREATE_FAILED,
        category: null,
        errors: [error?.message],
      };
      throw error;

    }
  }

  @MessagePattern('category_get_by_id')
  async findCategoryById(
    @Body() body: any
  ): Promise<ICategoryResponse> {

    let result;
    try {
      let category = await this.queryBus.execute(new FindCategoryQuery(body._id));
      result = {
        status: HttpStatus.OK,
        message: CATEGORY_GET_SUCCESS,
        category: category,
        errors: null,
      };
    } catch (error: any) {
      result = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: CATEGORY_GET_FAILED,
        category: null,
        errors: [error?.message],
      };
    }
    return result;
  }
}
