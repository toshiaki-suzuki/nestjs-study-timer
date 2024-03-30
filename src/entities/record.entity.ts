import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  material: string;

  @Column()
  learningTime: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @Column()
  userId: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
