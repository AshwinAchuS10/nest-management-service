import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category.module';
import { ProductModule } from 'modules/product.module';
import { HealthModule } from 'modules/health.module';

@Module({
  imports: [CategoryModule, ProductModule, HealthModule],
  exports: [CategoryModule, ProductModule, HealthModule],
})
export class ManagementServiceModule { }
