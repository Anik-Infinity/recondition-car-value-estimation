import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIdPramDto } from 'src/common/dto/users/user-id.param';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../common/dto/users/create-user.dto';
import { User } from '../../common/entity/users/user.entity';

@ApiTags('User')
@Controller('auth')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userReposity: Repository<User>,
  ) {}

  // get the list of all user
  @ApiResponse({ description: 'Get the all user list', status: HttpStatus.OK })
  @Get()
  findAllUser() {
    return this.userReposity.find();
  }

  // create new user
  @ApiResponse({ description: 'Create a new user', status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userReposity.create(createUserDto);
    await this.userReposity.save(user);
    return user;
  }

  // update user by id
  @ApiResponse({
    description: 'Update an existing user',
    status: HttpStatus.OK,
  })
  @ApiBody({ type: CreateUserDto })
  @Post('update/:id')
  async updateUser(@Param('id') id: UserIdPramDto, @Body() body: CreateUserDto) {
    const user = await this.userReposity.update(id, {
      ...body
    });
    return user;
  }
}
