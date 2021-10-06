import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateReportDto extends BaseDto {
  @ApiProperty({ default: 999999, required: true })
  @IsDecimal()
  price: number;

  @ApiProperty({
    default: 'This is a two months old used car!',
    required: true,
  })
  @IsString()
  description: string;
}
