import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto as NewUserDto } from 'src/common/dto/users/create-user.dto';
import { RequestService } from 'src/common/services/request.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private requestService: RequestService,
  ) {}

  async signup(newUserDto: NewUserDto) {
    // See if email is in use
    const users = await this.userService.findByEmail(newUserDto.email);
    // if (users.length) {
    //   throw new BadRequestException('email in use');
    // }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(newUserDto.password, salt, 32)) as Buffer;

    //Join the hashed reuslt and the salt together
    newUserDto.password = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.userService.create(
      newUserDto.name,
      newUserDto.email,
      newUserDto.password,
    );

    // return the user
    return 'user';
  }

  signin() {}
}
