import { Body, Controller, HttpStatus, Injectable, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../common/dto/users/create-user.dto';
import { User } from '../../common/entity/users/user.entity';

@ApiTags('User')
@Controller('auth')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userReposity: Repository<User>) {}

  @ApiResponse({ description: 'User Created', status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    // const user = this.userReposity.create(createUserDto);
    // await this.userReposity.save(user)
    // console.log(createUserDto)
    return 'hello form controller'
  }
}
