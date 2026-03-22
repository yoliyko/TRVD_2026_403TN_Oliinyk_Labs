import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // Якщо є помилка або користувач не знайдений
    if (err || !user) {
      console.log('--- JWT Guard Error Details ---');
      console.log('Error:', err);
      console.log('Info (чому не пустило):', info?.message);
      console.log('-------------------------------');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}