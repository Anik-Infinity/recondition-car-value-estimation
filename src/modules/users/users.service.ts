import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/users/user.entity';
import { CreateUserDto } from 'src/common/dto/users/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    create(body: CreateUserDto) {
        const user = this.userRepository.create({ ...body });

        return this.userRepository.save(user);
    }

    findOne(id: string) {
        return this.userRepository.findOne(id);
    }

    // find(email: string) {
    //     return this.userRepository.find({ email });
    // }

    find() {
        return this.userRepository.find();
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.userRepository.remove(user);
    }
}