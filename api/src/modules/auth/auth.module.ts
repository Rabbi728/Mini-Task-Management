import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PersonalAccessTokensService } from './service/personal-access-tokens.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, PersonalAccessTokensService],
  imports: [UserModule],
  exports: [AuthService, PersonalAccessTokensService]
})

export class AuthModule {}
