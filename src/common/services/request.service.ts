import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseDto } from '../dto/base.dto';

@Injectable()
export class RequestService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  forCreate<T extends BaseDto>(dto: T): T {
    if (dto) {
      dto.createdAt = new Date();
      dto.createdBy = 'f1ad9d4d-0972-4952-8e50-0e9c8cef5706';

      dto.updatedAt = new Date();
      dto.updatedBy = 'f1ad9d4d-0972-4952-8e50-0e9c8cef5706';

      console.log(this.request);
      return dto
    } else {
      throw new NotFoundException('No data specified!');
    }
  }
}
