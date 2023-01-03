import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Product, ProductImplement, ProductProperties } from 'domain/product/product.impl';

type CreateProductOptions = Readonly<{
    version: number;
    internalName: string;
    friendlyName: string;
    description: string;
    tags: Array<string>;
    steps: Array<object>;
    status: string;
    ownerId: string;
}>;

export class ProductFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

    create(options: CreateProductOptions): Product {
        return this.eventPublisher.mergeObjectContext(
            new ProductImplement({
                ...options,
            }),
        );
    }

    reconstitute(properties: ProductProperties): Product {
        return this.eventPublisher.mergeObjectContext(
            new ProductImplement(properties),
        );
    }
}
