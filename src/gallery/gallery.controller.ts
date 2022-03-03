import { Controller, Get, Header, Req } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { MovieService } from '../app/movie.service';
import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as _ from 'lodash';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly movieDbService: MovieService,
  ) {}

  /**
   * TODO: 功能还远没完成
   * @param folder
   */
  @Get('scanner')
  @Header('content-type', 'application/json')
  async scannerFolder(folder = '/Volumes/My Passport/非常警探') {
    folder = `/Volumes/My Passport`;
    return this.movieDbService.scannerDb(folder, 'movie', 1);
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
