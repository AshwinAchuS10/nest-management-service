import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category.module';
import { ProductModule } from 'modules/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  exports: [CategoryModule, ProductModule],
})
export class ManagementServiceModule {}
