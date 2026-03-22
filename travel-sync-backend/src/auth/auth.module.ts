import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RtStrategy } from './rt.strategy';
import { jwtConstants } from './constants'; 

@Global()
@Module({
  imports: [
    UsersModule, // Імпортуємо, щоб мати доступ до UsersService
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '60m' }, // Токен буде жити 60 хвилин
    }),
  ],
  providers: [AuthService, JwtStrategy, RtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}