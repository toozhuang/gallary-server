/**
 * date: 2023-02-17, Fri, 20:13
 * author: Wang
 * feature： permission 的 entity， 用来存储权限的信息， 注意这部分我们把
 * description 作为独立的实体来控制， 也就是说， description 是唯一的
 */

import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Index, ManyToMany, Unique } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'permission',
})
@Unique(['description'])
export class PermissionEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  resource: string;

  @Column()
  @Index({
    unique: true,
  })
  description: string;

  @Column()
  path: string;

  @Column('varchar', {
    default: 'get',
    length: 20,
  })
  method: string;

  @Column()
  isDefault: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => RoleEntity, (role) => role.permission)
  role: RoleEntity[];

  constructor(data?: Partial<PermissionEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
