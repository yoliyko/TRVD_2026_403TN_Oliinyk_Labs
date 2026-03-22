import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // РЕЄСТРАЦІЯ
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    
    // 1. Хешуємо пароль
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Створюємо юзера з хешованим паролем
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // 3. Прибираємо пароль з відповіді (безпека!)
    const { password: _, ...result } = user; 
    return result;
  }

// 3. Метод Логіну (оновлюємо існуючий)
async login(loginDto: CreateUserDto) {
  const user = await this.usersService.findOneByEmail(loginDto.email);
  if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
    throw new UnauthorizedException('Невірні дані');
  }

  const tokens = await this.getTokens(user.id, user.email, user.role);
  await this.updateRefreshToken(user.id, tokens.refreshToken);
  return tokens;
}
  // 1. Метод для створення пари токенів
async getTokens(userId: string, email: string, role: string) {
  const [at, rt] = await Promise.all([
    this.jwtService.signAsync(
      { sub: userId, email, role },
      { secret: jwtConstants.secret, expiresIn: '15m' }, // Access живe 15 хв
    ),
    this.jwtService.signAsync(
      { sub: userId, email, role },
      { secret: 'RT_SECRET', expiresIn: '7d' },  // Refresh живе 7 днів
    ),
  ]);

  return { accessToken: at, refreshToken: rt };
}

// 2. Метод для збереження хешу RT в базу
async updateRefreshToken(userId: string, refreshToken: string) {
  const salt = await bcrypt.genSalt();
  const hashedRT = await bcrypt.hash(refreshToken, salt);
  await this.usersService.updateRefreshToken(userId, hashedRT); // Треба додати в UsersService
}

// 4. Метод Refresh (для оновлення)
async refreshTokens(userId: string, refreshToken: string) {
  const user = await this.usersService.findOneByIdWithRT(userId); // Треба додати в UsersService
  if (!user || !user.hashedRefreshToken) throw new UnauthorizedException('Access Denied');

  const rtMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
  if (!rtMatches) throw new UnauthorizedException('Access Denied');

  const tokens = await this.getTokens(user.id, user.email, user.role);
  await this.updateRefreshToken(user.id, tokens.refreshToken);
  return tokens;
}
}