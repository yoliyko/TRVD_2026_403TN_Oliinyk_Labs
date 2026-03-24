import { Trip } from 'src/trips/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  // Дуже важливий рядок! Ми не хочемо, щоб пароль повертався з БД випадково
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'text',
    nullable: true, 
    select: false 
})
  hashedRefreshToken: string | null;
  
  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

}