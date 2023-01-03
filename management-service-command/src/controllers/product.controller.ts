import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import { CreateProductCommand } from "application/product/command/create.product.command";
import { PRODUCT_CREATE_FAILED, PRODUCT_CREATE_SUCCESS, PRODUCT_GET_FAILED, PRODUCT_GET_SUCCESS, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAILED, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED } from "constant/product.messages";
import { CreateProduct } from "domain/product/request/product.request";
import { ProductResponse } from "domain/product/response/product.response";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// import { FindProductQuery } from "application/product/query/find.product.query";
import { Product } from "domain/product/product.impl";
import { UpdateProductCommand } from "application/product/command/update.product.command";
// import { FindAllProductQuery } from "application/product/query/find.all.product.query";
import { DeleteProductCommand } from "application/product/command/delete.product.command";
import { UpdateProduct } from "domain/product/request/update.product.request";
import { DeleteProduct } from "domain/product/request/delete.product.request";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(readonly commandBus: CommandBus) {}

    @Post('/')
    @ApiCreatedResponse({
        type: ProductResponse,
    })
    async createProduct(@Body() body: CreateProduct): Promise<ProductResponse> {
        console.log("Body: ", body);
        let result;
        try {
            const command = new CreateProductCommand(
                body.version, body.internalName, body.friendlyName, body.description, body.steps, body.status, body.ownerId, body.tags
            )
            let product = await this.commandBus.execute(command);
            result = {
                status: HttpStatus.CREATED,
                message: PRODUCT_CREATE_SUCCESS,
                data: {
                    product: product
                },
                errors: null
            }
            return result;
        } catch(error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: PRODUCT_CREATE_FAILED,
                data: null,
                errors: [error?.message]
            }
            return result;
        }
    }

    @Patch('/update')
    @ApiCreatedResponse({
        type: ProductResponse,
    })
    async updateProduct(@Body() body: UpdateProduct): Promise<ProductResponse> {
        let result;
        try {
            const command = new UpdateProductCommand(
                body.id, body.version, body.internalName, body.friendlyName, body.description, body.steps, body.status, body.ownerId, body.tags
            )
            let product = await this.commandBus.execute(command);
            result = {
                status: HttpStatus.OK,
                message: PRODUCT_UPDATE_SUCCESS,
                data: {
                    product: product
                },
                errors: null
            }
            return result;
        } catch(error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: PRODUCT_UPDATE_FAILED,
                data: null,
                errors: [error?.message]
            }
            return result;
        }
        
    }

    @Delete('/:id')
    @ApiCreatedResponse({
        type: ProductResponse,
    })
    async deleteProduct(@Param() body: DeleteProduct): Promise<ProductResponse> {
        let result;
        try {
            let product = await this.commandBus.execute(new DeleteProductCommand(body.id));
            console.log("product: ", product);
            result = {
                status: HttpStatus.CREATED,
                message: PRODUCT_DELETE_SUCCESS,
                data: {
                    product: product
                },
                errors: null
            }
            return result;
        } catch (error: any) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: PRODUCT_DELETE_FAILED,
                data: null,
                errors: [error?.message],
            };
            return result;
        }
        
    }
}

