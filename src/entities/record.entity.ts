import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  material: string;

  @Column()
  learningTime: number;

  @Column()
  description: string;
}