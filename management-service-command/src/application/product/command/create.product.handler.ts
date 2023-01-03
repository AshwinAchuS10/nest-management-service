import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductFactory } from "domain/product/product.factory";
import { ProductRepository } from "domain/product/product.repository";
import { InjectionToken } from "../injection.token";
import { CreateProductCommand } from "./create.product.command";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand, void> {
    @Inject(InjectionToken.PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository;
    @Inject() private readonly productFactory: ProductFactory;
    async execute(command: CreateProductCommand): Promise<any> {
        const product = this.productFactory.create({
          ...command,
          version: command.version,
          internalName: command.internalName,
          friendlyName: command.friendlyName,
          description: command.description,
          steps: command.steps,
          status: command.status,
          ownerId: command.ownerId,
          tags: command.tags,
        });
    
        await this.productRepository.save(product);
        product.commit();
        return product;
      }
}