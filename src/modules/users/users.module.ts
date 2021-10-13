import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/common/entities/reports/report.entity';
import { User } from '../../common/entities/users/user.entity';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { }
