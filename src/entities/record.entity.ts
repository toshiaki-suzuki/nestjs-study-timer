import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  material: string;

  @Column()
  learningTime: number;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}