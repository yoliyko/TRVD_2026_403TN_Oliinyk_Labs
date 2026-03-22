import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // Той самий ключ, що і в auth.module.ts
    });
    console.log('1. JwtStrategy initialized');
  }
  

  // Цей метод викликається автоматично після перевірки токена
  async validate(payload: any) {
    // Те, що ми повертаємо тут, буде доступне в request.user
    console.log('JWT Payload found:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}