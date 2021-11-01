import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseDto } from '../dto/base.dto';
import { CustomBaseEntity } from '../entities/custom-base.entity';

@Injectable()
export class RequestService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  forCreate<T extends BaseDto>(dto: T): T {
    if (dto) {
      dto.createdAt = new Date();
      dto.createdBy = 'f1ad9d4d-0972-4952-8e50-0e9c8cef5706';

      dto.updatedAt = new Date();
      dto.updatedBy = dto.createdBy;

      return dto;
    } else {
      throw new NotFoundException('No data specified!');
    }
  }

  forCreateEntity<T extends CustomBaseEntity>(entity: T): T {
    if (entity) {
      entity.createdAt = new Date();
      entity.createdBy = 'f1ad9d4d-0972-4952-8e50-0e9c8cef5706';

      entity.updatedAt = new Date();
      entity.updatedBy = entity.createdBy;

      return entity;
    } else {
      throw new NotFoundException('No data specified!');
    }
  }
}
