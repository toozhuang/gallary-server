/**
 * date: 2023-02-17, Fri, 11:5
 * author: Wang
 * feature： typOrm 数据库操作lib 的配置信息
 * {
 *       type: 'mysql',
 *       host: 'localhost',
 *       // host.docker.internal
 *       port: 3306,
 *       username: 'wang',
 *       password: 'wang',
 *       database: 'wang-box',
 *       autoLoadEntities: true,
 *       synchronize: false,
 *     }
 */

export const ormConfig = (configureService: any): any => {
  return {
    type: 'mysql',
    host: 'localhost',
    // host.docker.internal
    port: 3306,
    username: 'wang',
    password: 'wang',
    database: 'wang-box',
    autoLoadEntities: true,
    synchronize: false,
  };
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
