import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApplicationUser } from '@nexthere/database';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ApplicationUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
