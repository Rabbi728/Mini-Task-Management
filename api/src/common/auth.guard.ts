import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonalAccessTokensService } from '@/modules/auth/service/personal-access-tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly personalAccessTokensService: PersonalAccessTokensService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenData = await this.personalAccessTokensService.verifyToken(token);
      
      if(!tokenData) {
        throw new UnauthorizedException();
      }
      request['user_token'] = tokenData;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
