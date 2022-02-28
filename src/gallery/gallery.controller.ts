import { Controller, Get, Req } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from '../app.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly movieDbService: AppService,
  ) {}

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
