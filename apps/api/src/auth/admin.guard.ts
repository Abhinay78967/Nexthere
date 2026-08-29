import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@nexthere/database';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, ensure standard JWT authentication passes
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Appended by JwtStrategy

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    // Role-based Access Control
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      // If no roles specified, default to at least needing some role or assume it's protected just by auth
      return true;
    }

    // Check if user has required role
    const hasRole =
      requiredRoles.includes(user.role) || user.role === 'SUPER_ADMIN';
    if (!hasRole) {
      throw new ForbiddenException(
        `Requires one of roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
