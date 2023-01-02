import { IsNotEmpty, Length } from 'class-validator';


export class CreateCategory {

  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsNotEmpty()
  @Length(2, 20)
  description: string;

  @IsNotEmpty()
  @Length(2, 20)
  status: string;

  tags: Array<string>;

  @IsNotEmpty()
  @Length(2, 25)
  ownerId: string;
}
