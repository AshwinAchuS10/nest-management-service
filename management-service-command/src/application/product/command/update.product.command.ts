import { ICommand } from '@nestjs/cqrs';

export class UpdateProductCommand implements ICommand {
  constructor(
    readonly id: string,
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