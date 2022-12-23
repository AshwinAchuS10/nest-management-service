import { IQuery } from '@nestjs/cqrs';

export class FindCategoryQuery implements IQuery {
  constructor(readonly _id: string) {}
}
