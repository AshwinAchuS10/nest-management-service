import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCategoryCommand } from './create.category.command';
import { InjectionToken } from '../injection.token';
import { CategoryFactory } from 'domain/category/category.factory';
import { CategoryRepository } from 'domain/category/category.repository';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand, void>
{
  @Inject(InjectionToken.CATEGORY_REPOSITORY)
  private readonly accountRepository: CategoryRepository;
  @Inject() private readonly categoryFactory: CategoryFactory;

  async execute(command: CreateCategoryCommand): Promise<any> {
    const category = this.categoryFactory.create({
      ...command,
      name: command?.name,
    });

    await this.accountRepository.save(category);
    category.commit();
    return category;
  }
}
