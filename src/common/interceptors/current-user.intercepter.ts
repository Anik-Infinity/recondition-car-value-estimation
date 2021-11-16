import {
  CallHandler,
  ExecutionContext, Injectable,
  NestInterceptor
} from '@nestjs/common';
import { UsersService } from '../../modules/users/service/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('current user interceptor called');

    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = this.userService.findOne(userId);
      delete (await user).password;
      request.currentUser = user;
    }

    return handler.handle();
  }
}
