import { ApiProperty } from "@nestjs/swagger";

export class FindProduct {
    @ApiProperty({
        example: '63b29c03ed3b6aa8683b901b',
    })
    id: string;
}