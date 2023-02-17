/**
 * date: 2023-02-17, Fri, 20:22
 * author: Wang
 * feature： 角色的 entity
 * 并且和permission构成多对多的关系
 */

import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { PermissionEntity } from './permission.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, Unique } from 'typeorm';

@Entity({
  name: 'role',
})
@Unique(['name'])
export class RoleEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  @Index({
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;

  // TODO: 这个绝逼还要好好看的
  // 通过 @JoinColumn 装饰器的配置，
  // TypeORM 会自动在 Order 实体的关联列上创建外键约束，
  // 并且在 Customer 实体的主键列上创建索引
  @ManyToMany(() => PermissionEntity, (permission) => permission.role)
  @JoinTable({
    // 关联表的名称
    name: 'role_permission',
    // 用于指定角色实体在关联表中的外键列的名称和引用的列名（这里是 roleId 和 id）
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  permission: PermissionEntity[];

  constructor(data?: Partial<RoleEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
