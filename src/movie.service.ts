/**
 * date: 2022-02-28, Mon, 15:48
 * author: TooZhun9
 * feature： 项目启动的时候提供的 injectable 做的一些操作
 */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import DB, { DBType } from './common/json-db';
import { XMLParser } from 'fast-xml-parser';
import { MovieException } from './common/exceptions/movie.exception';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MovieDb } = require('moviedb-promise');
@Injectable()
export class MovieService {
  private readonly moviedb;
  private readonly db: DBType;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('movie.api_key');
    this.moviedb = new MovieDb(apiKey);
    this.db = DB;
  }

  getMovieDb() {
    return this.moviedb;
  }
  // const jsonDb = await fs.promises.readFile(join(process.cwd(), 'json-db/movie.json'), 'utf8');
  // // console.log(jsonDb);
  // const result = JSON.parse(jsonDb);
  // console.log(result);
  // const XMLdata = await fs.promises.readFile(
  //   join(process.cwd(), 'json-db/非常警探.Restless.2022.WEB-DL.1080p.X264.nfo'),
  // );
  // const parser = new XMLParser();
  // const jObj = parser.parse(XMLdata);
  // result.push(jObj.movie);
  //
  // await fs.promises.writeFile(join(process.cwd(), 'json-db/test.json'), JSON.stringify(result));

  async setConfiguration() {
    try {
      await fs.promises.access(
        join(process.cwd(), 'json-db/configure.json'),
        fs.constants.R_OK | fs.constants.W_OK,
      );
    } catch {
      this.moviedb.configuration().then(async (value) => {
        await fs.promises.writeFile(
          join(process.cwd(), 'json-db/configure.json'),
          JSON.stringify(value),
        );
      });
    }
  }

  /**
   *  扫描文件夹的电影资源信息， 并将其加入到数据库 json 文件中
   * @param folder 要扫描的文件夹
   * @param dbName db 名称
   * @param dbVersion db 版本
   */
  async scannerDb(folder: string, dbName: string, dbVersion: number) {
    try {
      const hasDb = await this.db.existDB(dbName, dbVersion);
      if (hasDb) {
        //   如果有db 就直接读取
        const movieDb = await this.db.openDB(dbName, dbVersion);
        return movieDb;
      } else {
        // 创建一个 DB
      }
    } catch (e) {
      throw new MovieException(-4004, 'can not find this folder');
    }
  }
}
