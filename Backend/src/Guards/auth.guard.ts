import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // console.log(process.env.TOKEN);
        // return true;

        const request = context.switchToHttp().getRequest();

        // Extract the token from the Authorization header
        const tokenFromHeader = request.headers.authorization?.split('Bearer ')[0];

        // Get the token from the .env file
        const expectedToken = this.configService.get<string>('AuthorizationToken');
        
        // Compare the tokens
        const isValid = tokenFromHeader === expectedToken;

        return isValid;
    }
}