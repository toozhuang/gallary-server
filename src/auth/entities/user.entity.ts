/**
 * date: 2023-02-17, Fri, 16:41
 * author: Wang
 * feature： 用户的 entity， 并且基于 该 user table 扩展了需要的对应的能力
 */

import { CustomBaseEntity } from 'src/common/entity/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleEntity } from './role.entity';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'user',
})
export class UserEntity extends CustomBaseEntity {
  @Index({
    unique: true,
  })
  @Column()
  username: string;

  @Index({
    unique: true,
  })
  @Column()
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Index()
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  avatar: string;

  @Column()
  status: UserStatusEnum;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  token: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  tokenValidityDate: Date;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  salt: string;

  @Column({
    nullable: true,
  })
  @Exclude({
    toPlainOnly: true,
  })
  twoFASecret?: string;

  @Exclude({
    toPlainOnly: true,
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  twoFAThrottleTime?: Date;

  @Column({
    default: false,
  })
  isTwoFAEnabled: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  skipHashPassword = false;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;

  @Column()
  roleId: number;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}
