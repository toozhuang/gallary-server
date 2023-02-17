/**
 * date: 2023-02-17, Fri, 11:5
 * author: Wang
 * feature： typOrm 数据库操作lib 的配置信息
 */
import { ConfigService } from '@nestjs/config';

export const ormConfig = (configureService: ConfigService): any => {
  return {
    type: configureService.get('db.type'),
    host: configureService.get('db.host'),
    port: configureService.get('db.port'),
    username: configureService.get('db.username'),
    password: configureService.get('db.password'),
    autoLoadEntities: true,
    synchronize: false,
  };
};

/**
 * postgres 数据库配置
 */
const demoPostgres = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  synchronize: false,
};

/**
 * mysql 数据库配置
 */
const demoMysql = {
  type: 'mysql',
  host: 'localhost',
  // host.docker.internal
  port: 3306,
  username: 'wang',
  password: 'wang',
  database: 'wang-box',
  autoLoadEntities: true, // 自动加载实体
  synchronize: false,
};
