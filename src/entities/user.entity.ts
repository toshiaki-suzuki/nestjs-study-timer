import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: number;

  @Column()
  password: string;

  @Column()
  birthday: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}