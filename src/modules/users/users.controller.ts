import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/common/dto/users/update-user.dto';
import { UserDto } from 'src/common/dto/users/user.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UsersService } from './users.service';

// @UseInterceptors(ClassSerializerInterceptor)
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ description: 'Create a new user', status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const user = this.usersService.create(body);
    return user;
  }

  @ApiResponse({ description: 'Get user by ID', status: HttpStatus.OK })
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  // @ApiResponse({ description: 'Get all the user by email', status: HttpStatus.OK })
  // @Get()
  // findAllUsers(@Query('email') email: string) {
  //   return this.usersService.find(email);
  // }

  @ApiResponse({ description: 'Get all the user', status: HttpStatus.OK })
  @Get()
  findAllUsers() {
    return this.usersService.find();
  }

  @ApiResponse({ description: 'Delete an user by id', status: HttpStatus.OK })
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiResponse({
    description: 'Update an existing user',
    status: HttpStatus.OK,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
