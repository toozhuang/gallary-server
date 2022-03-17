/**
 * date: 2022-03-17, Thu, 21:14
 * author: Wang
 * feature： 负责和 database 相关的 module 和 service
 */
import { Module } from '@nestjs/common';
import { DbService } from './db.service';
// import { JsonDB } from 'node-json-db';
// import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  constructor() {
    // new JsonDB(new Config('./json-db/movieDatabase', true, false, '/')).push(
    //   '/movieDetail',
    //   {
    //     version: 2,
    //     update: `2022年03月17日${new Date()}`,
    //   },
    // );
  }
}
