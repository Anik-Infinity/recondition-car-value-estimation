import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateUserDto extends BaseDto {
  @ApiProperty({ default: 'anik@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 's12345', required: true })
  @IsString()
  @MinLength(4)
  password: string;
}
