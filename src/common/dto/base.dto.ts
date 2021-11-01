import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ActiveStatus } from '../enum/active-status.enum';

export abstract class BaseDto {
  // @ApiProperty({ default: 'xyz-ijk-mno-pqr', required: true })
  @Allow()
  id: string;

  // @ApiProperty({ default: ActiveStatus.enabled, required: true })
  @Allow()
  version: number;

  // @ApiProperty({ default: ActiveStatus.enabled, required: true })
  @Allow()
  isActive: ActiveStatus;

  // @ApiProperty({ default: null, required: true })
  @Allow()
  createdBy: string | null;

  // @ApiProperty({ default: null, required: true })
  @Allow()
  updatedBy: string | null;

  // @ApiProperty({ default: new Date().toISOString(), required: true })
  @Allow()
  createdAt: Date | null;

  // @ApiProperty({ default: new Date().toISOString(), required: true })
  @Allow()
  updatedAt: Date | null;
}
