import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category, CategoryImplement, CategoryProperties } from 'domain/category/category.impl';

type CreateCategoryOptions = Readonly<{
    name: string;
    description: string;
    status: string;
    tags: Array<string>;
    ownerId: string;
}>;

export class CategoryFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

    create(options: CreateCategoryOptions): Category {
        return this.eventPublisher.mergeObjectContext(
            new CategoryImplement({
                ...options,
            }),
        );
    }

    reconstitute(properties: CategoryProperties): Category {
        return this.eventPublisher.mergeObjectContext(
            new CategoryImplement(properties),
        );
    }
}
