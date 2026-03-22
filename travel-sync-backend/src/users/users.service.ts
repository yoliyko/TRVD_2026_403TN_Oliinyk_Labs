import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Змінюємо тут тип на Partial<User>
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
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