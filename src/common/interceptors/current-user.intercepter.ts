import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/service/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userID } = request.session || {};

    if (userID) {
      const user = await this.userService.findOne(userID);
      request.currentUser = user;
    }

    return handler.handle();
  }
}