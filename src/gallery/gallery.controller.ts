import { Controller, Get, Req } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from '../app.service';
import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as _ from 'lodash';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly movieDbService: AppService,
  ) {}

  @Get('scanner')
  async scannerFolder(folder = '/Volumes/My Passport/非常警探') {
    folder = `/Volumes/My Passport`;
    const moviesFolder = await fs.promises.readdir(folder, 'utf8');
    //  读取 meta 文件， 并存储到项目数据库
    const jsonDb = await fs.promises.readFile(join(process.cwd(), 'json-db/movie.json'), 'utf8');
    // console.log(jsonDb);
    const jsonDbObj = JSON.parse(jsonDb);

    for (let index = 0; index < moviesFolder.length; index++) {
      const movieFolder = moviesFolder[index];
      // console.log(movieFolder);
      try {
        // 是文件
        const isFolder = fs.lstatSync(path.join(folder, `/${movieFolder}`)).isDirectory();
        if (isFolder) {
          const movieFolderItemList = await fs.promises.readdir(
            path.join(folder, `/${movieFolder}`),
            'utf8',
          );

          const extName = movieFolderItemList.map((item) => path.extname(item));
          const nfoInxde = _.indexOf(extName, '.nfo');
          if (nfoInxde > 0) {
            const XMLdata = await fs.promises.readFile(
              join(`${folder}/${movieFolder}/`, movieFolderItemList[nfoInxde]),
            );
            const parser = new XMLParser();
            const jObj = parser.parse(XMLdata);
            jsonDbObj.push(jObj.movie);

            await fs.promises.writeFile(
              join(process.cwd(), 'json-db/movie.json'),
              JSON.stringify(jsonDbObj),
            );
          } else {
            // todo: 不包含 meta 文件， 当前情况则跳过
          }
        } else {
          console.log(folder, `/${movieFolder}`, 'is not a folder');
        }
      } catch (error) {
        //  是文件夹
      }
    }

    return 'aoaojiao';
  }

  @Get()
  async getHello(
    @Req() req: Request,
  ): Promise<{ name: string; poster: string; meta: string; fanart: string }[]> {
    console.log('body: ', req);
    const movieDb = this.movieDbService.getMovieDb();

    movieDb
      .searchMovie({ query: '杀破狼' })
      .then((res) => {
        // console.log(res);
      })
      .catch(console.error);

    // console.log(process.cwd());
    const jsonDb = await fs.promises.readFile(join(process.cwd(), 'json-db/movie.json'), 'utf8');
    // console.log(jsonDb);
    const result = JSON.parse(jsonDb);
    // return new StreamableFile(jsonDb);
    return new Promise((resolve, reject) => {
      resolve(result);
      reject(result);
    });
    // return this.readFileService.readFolder('/Users/wang/Documents');
  }
}
