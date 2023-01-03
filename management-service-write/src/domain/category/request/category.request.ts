import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class Category {
    @IsNotEmpty()
    @ApiProperty()
    @Length(2, 20)
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    @Length(2, 20)
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    @Length(2, 20)
    status: string;

    @ApiProperty()
    tags: Array<string>;

    @IsNotEmpty()
    @ApiProperty()
    @Length(2, 25)
    ownerId: string;
}
