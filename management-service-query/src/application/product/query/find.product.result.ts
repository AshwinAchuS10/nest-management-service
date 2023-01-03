import { IQueryResult } from '@nestjs/cqrs';

export class FindProductResult implements IQueryResult {
  readonly _id: string;
  readonly version: number;
  readonly internalName: string;
  readonly friendlyName: string;
  readonly description: string;
  readonly steps: Array<object>;
  readonly tags: Array<string>;
  readonly ownerId: string;
  readonly status: string;
}