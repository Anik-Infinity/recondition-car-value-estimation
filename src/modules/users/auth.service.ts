import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.userService.findByEmail(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // Hash the users password
        // Generate a salt

        //Hash the salt and the password together

        //Join the hashed reuslt and the salt together
    }

    signin() {

    }

}