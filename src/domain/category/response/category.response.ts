import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../request/category.request';

export class CategoryResponse {
  @ApiProperty({ example: 'Category Created.' })
  message: string;

  @ApiProperty()
  status: number;

  @ApiProperty({
    type: Category,
  })
  data: {
    category: Category;
  } | null;

  @ApiProperty({ nullable: true })
  errors?: Array<any> | null;
}
