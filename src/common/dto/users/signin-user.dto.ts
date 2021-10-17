import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class SignInUserDto extends BaseDto {
  
  @ApiProperty({ default: 'anik@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 's12345', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
