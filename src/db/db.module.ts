/**
 * date: 2022-03-17, Thu, 21:14
 * author: Wang
 * feature： 负责和 database 相关的 module 和 service
 */
import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [DbService, ConfigService],
  exports: [DbService],
})
export class DbModule {
  constructor(
    private dbService: DbService,
    private configService: ConfigService,
  ) {
    const movieLocation: string = this.configService.get('movie.db_location');
    // Inject movie location
    // 利用 nest js 的特点
    // service 全局可用
    // 相当于这个理注册了我们 DB service 的变量 DB
    // 同时全局可用
    dbService.init(movieLocation);
  }
}
