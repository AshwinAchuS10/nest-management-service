import { AggregateRoot } from '@nestjs/cqrs';

export type CategoryEssentialProperties = Readonly<
  Required<{
    name: string;
  }>
>;

export type CategoryOptionalProperties = Readonly<
  Partial<{
  }>
>;

export type CategoryProperties = CategoryEssentialProperties &
  Required<CategoryOptionalProperties>;

export interface Category {
  commit: () => void;
}

export class CategoryImplement extends AggregateRoot implements Category {
  private readonly name: string;

  constructor(properties: CategoryProperties) {
    super();
    Object.assign(this, properties);
  }
}
