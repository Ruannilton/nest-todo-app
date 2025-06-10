import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../domain/dtos/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as CurrentUserDto;
    return user;
  },
);
