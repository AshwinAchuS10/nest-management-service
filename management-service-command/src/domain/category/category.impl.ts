import { AggregateRoot } from '@nestjs/cqrs';

export type CategoryEssentialProperties = Readonly<
    Required<{
        name: string;
        status: string;
        ownerId: string;
    }>
>;

export type CategoryOptionalProperties = Readonly<
    Partial<{
        tags: Array<string>;
        description: string;
    }>
>;

export type CategoryProperties = CategoryEssentialProperties & Required<CategoryOptionalProperties>;

export interface Category {
    commit: () => void;
}

export class CategoryImplement extends AggregateRoot implements Category {
    constructor(properties: CategoryProperties) {
        super();
        Object.assign(this, properties);
    }
}
