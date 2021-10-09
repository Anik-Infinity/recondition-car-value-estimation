import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserIdPramDto {
    @ApiProperty({description: 'User Id', required: true})
    @IsString()
    @MinLength(1)
    @MaxLength(200)
    @IsNotEmpty()
    id: string;
}