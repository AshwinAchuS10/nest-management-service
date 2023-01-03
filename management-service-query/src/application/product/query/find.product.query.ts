import { IQuery } from '@nestjs/cqrs';

export class FindProductQuery implements IQuery {
  constructor(readonly _id: string) {}
}
