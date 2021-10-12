import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserIdPramDto {
    @ApiProperty({type: String, description: 'User Id', required: true})
    @IsString()
    id: string;
}
