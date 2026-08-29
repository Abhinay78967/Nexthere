import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
      }),
      issuer: `${process.env.SUPABASE_URL}/auth/v1`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    try {
      const user = await this.prisma.client.applicationUser.findUnique({
        where: { authProviderId: payload.sub },
      });

      if (!user) {
        this.logger.warn(`User not found for sub: ${payload.sub}`);
        throw new UnauthorizedException('User not found in system');
      }

      if (user.status === 'DISABLED') {
        this.logger.warn(`Disabled user attempted access: ${user.email}`);
        throw new UnauthorizedException('User account is disabled');
      }

      return user; // Attached to request.user
    } catch (err) {
      this.logger.error('Error in JWT validation', err);
      throw new UnauthorizedException('Validation error');
    }
  }
}
