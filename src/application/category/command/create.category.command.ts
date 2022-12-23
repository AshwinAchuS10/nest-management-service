import { ICommand } from '@nestjs/cqrs';

export class CreateCategoryCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly status: string,
    readonly ownerId: string,
    readonly tags: Array<string>,
  ) { }
}
