import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@ApiTags('User')
@Controller('auth')
export class UsersController {
  @ApiResponse({ description: 'User Created', status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  @ApiProperty({type: CreateUserDto})
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
