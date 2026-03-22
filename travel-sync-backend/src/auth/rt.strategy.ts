import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants'; 

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'RT_SECRET',
      passReqToCallback: true, // Це дозволить дістати сам токен з реквесту
    });
  }

  validate(req: Request, payload: any) {
  const authHeader = req.get('authorization');
  if (!authHeader) return null; // Перевірка на випадок, якщо заголовок порожній

  const refreshToken = authHeader.replace('Bearer', '').trim();
  return { ...payload, refreshToken };
}
}