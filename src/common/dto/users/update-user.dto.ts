import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ActiveStatus } from 'src/common/enum/active-status.enum';

export class UpdateUserDto {
  @ApiProperty({ default: 'Md. Anik', required: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ default: 'anik@gmail.com', required: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 's12345', required: true })
  @IsOptional()
  @IsString()
  //@MinLength(4)
  password: string;

  @ApiProperty({ default: ActiveStatus.enabled, required: true })
  @IsOptional()
  @IsEnum(ActiveStatus, { message: "Status Should be 0 or 1" })
  isActive: number;
}
