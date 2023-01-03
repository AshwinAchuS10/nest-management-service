import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(
    readonly version: number,
    readonly internalName: string,
    readonly friendlyName: string,
    readonly description: string,
    readonly steps: Array<object>,
    readonly status: string,
    readonly ownerId: string,
    readonly tags: Array<string>,
  ) { }
}
