import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Змінюємо тут тип на Partial<User>
  async create(userData: Partial<User>): Promise<User> {
  // Ми явно створюємо НОВИЙ об'єкт БЕЗ ID, 
  // щоб TypeORM навіть не думав про оновлення
  const newUser = this.usersRepository.create({
    email: userData.email,
    password: userData.password,
    role: userData.role || UserRole.USER
  });

  return await this.usersRepository.save(newUser);
}
  // Цей метод правильний, але перевір його наявність
  async findOneByEmail(email: string): Promise<User | undefined> {
  const user = await this.usersRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOne();

  return user || undefined; // Якщо user буде null, повернеться undefined
}
async updateRefreshToken(id: string, hashedRT: string | null) {
  // Використовуємо .update з явним приведенням типу, щоб TS не сварився
  await this.usersRepository.update(id, { 
    hashedRefreshToken: hashedRT as any 
  });
}

async findOneByIdWithRT(id: string) {
  return this.usersRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .addSelect('user.hashedRefreshToken')
    .getOne();
}
}