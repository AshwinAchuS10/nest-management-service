import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductFactory } from "domain/product/product.factory";
import { ProductRepository } from "domain/product/product.repository";
import { InjectionToken } from "../injection.token";
// import { ProductQuery } from "../query/product.query";
import { DeleteProductCommand } from "./delete.product.command";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand, void> {
    @Inject(InjectionToken.PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository;
    @Inject() private readonly productFactory: ProductFactory;
    // @Inject(InjectionToken.PRODUCT_QUERY) readonly productQuery: ProductQuery;
    async execute(command: DeleteProductCommand): Promise<any> {
        console.log("command: ", command);
        let product: any = await this.productRepository.findById(command._id);
    
        await this.productRepository.delete(command._id);
        // product.commit();
        return product;
    }
}