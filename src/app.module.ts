import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ReportsModule } from './modules/reports/reports.module';
import { User } from './common/entity/users/user.entity';
import { Report } from './common/entity/reports/report.entity';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
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
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          levelFirst: true,
        },

        // Define a custom logger level
        customLogLevel: function (res, err) {
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          } else if (res.statusCode >= 500 || err) {
            return 'error';
          }
          return 'info';
        },

        // Define a custom success message
        customSuccessMessage: function (res) {
          if (res.statusCode === 404) {
            return 'resource not found';
          }
          return 'request completed';
        },

        // Define a custom error message
        customErrorMessage: function (error, res) {
          return 'request errored with status code: ' + res.statusCode;
        },

        // Override attribute keys for the log object
        customAttributeKeys: {
          req: 'request',
          res: 'response',
          err: 'error',
          responseTime: 'timeTaken',
        },

        // Override request and response body
        serializers: {
          res: (res) => {
            const { statusCode } = res;
            return { statusCode: statusCode };
          },
          req: (req) => {
            const {method, url, query, params} = req;
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
