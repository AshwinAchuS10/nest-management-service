import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { PRODUCT_GET_FAILED, PRODUCT_GET_SUCCESS } from "constant/product.messages";
import { ProductResponse } from "domain/product/response/product.response";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FindProductQuery } from "application/product/query/find.product.query";
import { FindAllProductQuery } from "application/product/query/find.all.product.query";
import { FindProduct } from "domain/product/request/find.product.request";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

    @Get('/:id')
    async findProductById(@Param() body: FindProduct): Promise<ProductResponse> {
        let result;
        try {
            let product = await this.queryBus.execute(new FindProductQuery(body.id));
            console.log("product: ", product);
            result = {
                status: HttpStatus.OK,
                message: PRODUCT_GET_SUCCESS,
                data: { product: product },
                errors: null,
            };
            return result;
        } catch (error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: PRODUCT_GET_FAILED,
                data: null,
                errors: [error?.message],
            };
            return result;
        }
        
    }

    @Get('/')
    async findProducts(): Promise<ProductResponse> {
        let result;
        try {
            let product = await this.queryBus.execute(new FindAllProductQuery());
            console.log("product: ", product);
            result = {
                status: HttpStatus.OK,
                message: PRODUCT_GET_SUCCESS,
                data: { product: product },
                errors: null,
            };
            return result;
        } catch (error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: PRODUCT_GET_FAILED,
                data: null,
                errors: [error?.message],
            };
            return result;
        }
        
    }

}

