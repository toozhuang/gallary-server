/**
 * date: 2022-02-28, Mon, 15:48
 * author: TooZhun9
 * feature： 项目启动的时候提供的 injectable 做的一些操作
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DB, { DBType } from '../common/db/json-db';

import { MovieException } from '../common/exceptions/movie.exception';
import { join } from 'path';
import * as fs from 'fs';

import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as _ from 'lodash';

import { INfometa } from './dto/movie.interface';
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
   *  当前的业务逻辑会扫描所有的文件夹， 读取内部的 nfo 文件来确定信息
   *  而对于没有 nfo 的文件，当前的业务逻辑是存到一个 另一个名字叫 other 的json 中
   *  定时的对 other 和 nfo 文件进行比对， 来删除 other 中的文件信息
   *  NOTE: 既然能sacn 那就要确定是能够scan 才进来的
   * @param folder 要扫描的文件夹
   * @param dbName db 名称
   * @param dbVersion db 版本
   */
  async scannerDb(folder: string, dbName: string, dbVersion: number) {
    try {
      await this.db.ExistDB(dbName, dbVersion);
    } catch (e) {
      await DB.CreateDB('movie', 1);
    }

    try {
      //我们要开始扫描数据， 然后对这个数据库进行增删改查了
      const moviesFolder = await fs.promises.readdir(folder, 'utf8');

      // return movieDb;

      // 对用户端的folder 进行扫描，并扫描结果对json文件进行更新
      for (let index = 0; index < moviesFolder.length; index++) {
        const movieDb = await this.db.OpenDB(dbName, dbVersion);
        const movieFolder = moviesFolder[index];
        try {
          // 判断该moviesFolder中的movieFolder 是文件 还是是 文件夹
          const isFolder = fs.lstatSync(path.join(folder, `/${movieFolder}`)).isDirectory();
          if (isFolder) {
            // 如果是文件夹， 那么就读取该文件夹中的meta data 信息
            const movieFolderItemList = await fs.promises.readdir(
              path.join(folder, `/${movieFolder}`),
              'utf8',
            );

            const extName = movieFolderItemList.map((item) => path.extname(item));
            const nfoIndex = _.indexOf(extName, '.nfo');
            if (nfoIndex > 0) {
              //如果该文件夹中有 nfo meta data 文件
              const XMLdata = await fs.promises.readFile(
                join(`${folder}/${movieFolder}/`, movieFolderItemList[nfoIndex]),
              );
              const parser = new XMLParser();
              const movieItem: INfometa = parser.parse(XMLdata);

              if (DB.FindItem(movieDb, movieItem.movie.id) === -1) {
                movieItem.movie.location = folder + `/${movieFolder}`;
                //  如果当前数据库中不存在这个 id
                DB.InsertItem(movieDb, movieItem);
                await DB.SaveDB(movieDb);
              } else {
                // console.log('已经存在该movie的信息', movieItem.movie.id);
              }
            } else {
              // todo: 不包含 meta 文件， 当前情况则跳过
              //   TODO：后续需要在这里处理， 把这些不包含 meta 的文件 的具体信息写入到 other 中去， 先这样就会有一个other来专门控制
            }
          } else {
            console.log(folder, `/${movieFolder}`, 'is not a folder');
          }
        } catch (error) {
          //  是文件夹
          // console.log('error:', error);
        }
      }

      return {
        status: 1002, // 代表成功
        message: '扫描完成',
      };
    } catch (e) {
      throw new MovieException(-4004, 'init movie db error');
    }
  }
}
