/**
 * date: 2023-02-13, Mon, 14:35
 * author: Wang
 * feature： 直接和数据库对接的 category entity
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_override: boolean;

  @Column()
  modified: string;

  @Column()
  type: string;

  @Column()
  deleted: boolean;
}
