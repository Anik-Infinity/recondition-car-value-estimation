import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/common/entities/reports/report.entity';
import { User } from '../../common/entities/users/user.entity';
import { AuthService } from './service/auth.service';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { RequestService } from 'src/common/services/request.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, RequestService]
})
export class UsersModule { }
