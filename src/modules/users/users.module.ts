import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/common/entity/reports/report.entity';
import { User } from '../../common/entity/users/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
