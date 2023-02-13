import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('toshl')
export class ToshlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spendingAmount: number;

  @Column()
  date: string;

  @Column()
  account: string;

  @Column()
  category: string;

  @Column()
  tag: string;
}
