/**
 * date: 2022-03-17, Thu, 21:14
 * author: Wang
 * feature： 负责和 database 相关的 module 和 service
 */
import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  constructor(private dbService: DbService) {
    dbService.init(
      '/Users/wang/Documents/GitHub/gallery-server/json-db/movieDatabase.json',
    );
  }
}
