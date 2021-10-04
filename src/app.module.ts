import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
@Module({
  imports: 
  [
    UsersModule, 
    ReportsModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: Boolean(process.env.DATABASE_SYNCRONIZE),
      schema: process.env.DATABASE_SCHEMA,
      logging: true,
      entities: [User, Report],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
