import { Injectable, Inject, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PersonalAccessTokensService } from './personal-access-tokens.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly personalAccessTokensService: PersonalAccessTokensService,
    ) { }

    async userLogin(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        if(!pass){
            throw new HttpException('Password is required', 400);
        }
        
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid credentials', 401);
        }

        const token = await this.personalAccessTokensService.createToken(user.id);
        return {
            user,
            token
        };
    }
}
