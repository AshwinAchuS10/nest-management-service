import { AggregateRoot } from '@nestjs/cqrs';

export type ProductEssentialProperties = Readonly<
  Required<{
    version: number;
    internalName: string;
    friendlyName: string;
    steps: Array<object>;
    status: string;
    ownerId: string;
  }>
>;

export type ProductOptionalProperties = Readonly<
  Partial<{
    tags: Array<string>
    description: string;
  }>
>;

export type ProductProperties = ProductEssentialProperties &
  Required<ProductOptionalProperties>;

export interface Product {
  commit: () => void;
}

export class ProductImplement extends AggregateRoot implements Product {

  constructor(properties: ProductProperties) {
    super();
    Object.assign(this, properties);
  }
}
