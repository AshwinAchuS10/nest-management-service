import { ICommand } from '@nestjs/cqrs';

export class DeleteProductCommand implements ICommand {
  constructor(
    readonly _id: string
  ) { }
}