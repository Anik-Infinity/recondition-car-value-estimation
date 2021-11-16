import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decoratos/current-user.decorator';
import { CreateUserDto } from 'src/common/dto/users/create-user.dto';
import { SignInUserDto } from 'src/common/dto/users/signin-user.dto';
import { UpdateUserDto } from 'src/common/dto/users/update-user.dto';
import { UserDto } from 'src/common/dto/users/user.dto';
import { User } from 'src/common/entities/users/user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/common/interceptors/current-user.intercepter';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';

// @UseInterceptors(ClassSerializerInterceptor)
// Controller bounded interceptor
// Expose only public data while response
@UseInterceptors((CurrentUserInterceptor))
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Show the currently logedIn user
  // @Get('whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whioAmI(@CurrentUser() user: User) {
    console.log('who am i called', user);
    return user;
  }

  // Signout current user
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // Create / Signup a new user
  @ApiResponse({ description: 'Create a new user', status: HttpStatus.CREATED })
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(createUserDto);
    session.userId = user.id;
    return user;
  }

  // Signin user
  @ApiResponse({ description: 'User signin', status: HttpStatus.OK })
  @Post('/signin')
  @ApiBody({ type: SignInUserDto })
  async signin(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  // Get an user by ID
  @ApiResponse({ description: 'Get user by ID', status: HttpStatus.OK })
  @Get('find-user/:id')
  async findUser(@Param('id') id: string) {

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  // Get the list of users
  @ApiResponse({ description: 'Get all the user', status: HttpStatus.OK })
  @Get('user-list')
  findAllUsers() {
    return this.usersService.find();
  }

  // Delete an user by ID
  @ApiResponse({ description: 'Delete an user by id', status: HttpStatus.OK })
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Update an user by ID
  @ApiResponse({
    description: 'Update an existing user',
    status: HttpStatus.OK,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  // @ApiResponse({ description: 'Get all the user by email', status: HttpStatus.OK })
  // @Get()
  // findAllUsers(@Query('email') email: string) {
  //   return this.usersService.find(email);
  // }

  // @ApiResponse({ description: 'Set color session', status: HttpStatus.OK })
  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @ApiResponse({ description: 'Get color session', status: HttpStatus.OK })
  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }
}
