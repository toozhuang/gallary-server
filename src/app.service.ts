/**
 * date: 2022-02-28, Mon, 15:48
 * author: TooZhun9
 * feature： 项目启动的时候提供的 injectable 做的一些操作
 */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MovieDb } = require('moviedb-promise');
@Injectable()
export class AppService {
  private readonly moviedb;
  constructor() {
    this.moviedb = new MovieDb('8f54beed88428126789cc1654fe73bf2');
  }

  getMovieDb() {
    return this.moviedb;
  }

  setConfiguration() {
    this.moviedb.configuration().then(async (value) => {
      let accessAble: boolean;
      try {
        await fs.promises.access(
          join(process.cwd(), 'json-db/configure.json'),
          fs.constants.R_OK | fs.constants.W_OK,
        );
        accessAble = true;
      } catch {
        accessAble = false;
      }
      console.log(accessAble);
      if (!accessAble) {
        await fs.promises.writeFile(
          join(process.cwd(), 'json-db/configure.json'),
          JSON.stringify(value),
        );
      } else {
        console.log('文件已经存在， 不需要了； ');
      }
    });
  }
}
