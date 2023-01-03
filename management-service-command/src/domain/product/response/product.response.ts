import { ApiProperty } from '@nestjs/swagger';
import { CreateProduct } from '../request/product.request';

export class ProductResponse {
  @ApiProperty({ example: 'Product Created.' })
  message: string;

  @ApiProperty()
  status: number;

  @ApiProperty({
    type: CreateProduct,
  })
  data: {
    product: CreateProduct;
  } | null;

  @ApiProperty({ nullable: true })
  errors?: Array<any> | null;
}