import { IQueryResult } from '@nestjs/cqrs';

export class FindCategoryResult implements IQueryResult {
  readonly _id: string;
  readonly name: string;
}
