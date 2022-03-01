/**
 * date: 2022-02-28, Mon, 15:48
 * author: TooZhun9
 * feature： 项目启动的时候提供的 injectable 做的一些操作
 */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { XMLParser } from 'fast-xml-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MovieDb } = require('moviedb-promise');
@Injectable()
export class AppService {
  private readonly moviedb;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('movie.api_key');
    this.moviedb = new MovieDb(apiKey);
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
}
