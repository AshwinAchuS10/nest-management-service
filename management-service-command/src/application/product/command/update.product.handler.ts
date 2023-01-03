import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductFactory } from "domain/product/product.factory";
import { ProductRepository } from "domain/product/product.repository";
import { InjectionToken } from "../injection.token";
// import { ProductQuery } from "../query/product.query";
import { UpdateProductCommand } from "./update.product.command";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand, void> {
    @Inject(InjectionToken.PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository;
    @Inject() private readonly productFactory: ProductFactory;
    // @Inject(InjectionToken.PRODUCT_QUERY) readonly productQuery: ProductQuery;
    async execute(command: UpdateProductCommand): Promise<any> {
        // const product = this.productFactory.create({
        //   ...command,
        //   version: command.version,
        //   internalName: command.internalName,
        //   friendlyName: command.friendlyName,
        //   description: command.description,
        //   steps: command.steps,
        //   status: command.status,
        //   ownerId: command.ownerId,
        //   tags: command.tags,
        // });
        let product: any = await this.productRepository.findById(command.id);
        product.version = command.version?command.version:product?.version;
        product.internalName = command.internalName?command.internalName:product?.internalName;
        product.friendlyName = command.friendlyName?command.friendlyName:product?.friendlyName;
        product.description = command.description?command.description:product?.description;
        product.steps = command.steps?command.steps:product?.steps;
        product.tags = command.tags?command.tags:product?.tags;
        product.ownerId = command.ownerId?command.ownerId:product?.ownerId;
        product.status = command.status?command.status:product?.status;
        let updatedProduct = await this.productRepository.save(product);
        // updatedProduct.commit();
        return updatedProduct;
      }
}