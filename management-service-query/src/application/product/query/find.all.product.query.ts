import { IQuery } from '@nestjs/cqrs';

export class FindAllProductQuery implements IQuery {
  constructor() {}
}
