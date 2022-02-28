import { Controller, Get } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
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
  async getHello(): Promise<{ name: string; poster: string; meta: string; fanart: string }[]> {
    const movieDb = this.movieDbService.getMovieDb();

    movieDb
      .searchMovie({ query: '杀破狼' })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);

    console.log(process.cwd());
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
