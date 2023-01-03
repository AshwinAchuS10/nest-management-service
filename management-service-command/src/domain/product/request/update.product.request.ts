import { ApiProperty } from "@nestjs/swagger";

export class UpdateProduct {
    @ApiProperty({
        example: '63b29c03ed3b6aa8683b901b',
    })
    id: string;

    @ApiProperty({
        minLength: 2,
        example: 1,
    })
    version: number;

    @ApiProperty({
        example: 'test',
    })
    internalName: string;

    @ApiProperty({
        example: 'test',
    })
    friendlyName: string;

    @ApiProperty({
        example: 'test',
    })
    description: string;

    @ApiProperty({
        example: [{
            "step1":"description1"
        }],
    })
    steps: Array<object>;

    @ApiProperty({
        example: [
            "test"
        ],
    })
    tags: Array<string>;

    @ApiProperty({
        example: 'test',
    })
    ownerId: string;

    @ApiProperty({
        example: 'created',
    })
    status: string;
}