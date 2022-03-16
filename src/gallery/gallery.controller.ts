import { Controller, Get, Header, Param } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
// import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { MovieService } from '../app/movie.service';
import { GalleryService } from './gallery.service';
import { MovieException } from '../common/exceptions/movie.exception';
import { Db } from '../app/dto/db';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly galleryService: GalleryService,
    private readonly movieDbService: MovieService,
    private readonly DbService: Db,
  ) {
    this.DbService.generateDb('12315');
  }

  @Get('movie-folder/:id')
  async getMovieFolderDetail(@Param('id') movieId: string) {
    // return this.DbService.tellDb();
    return this.movieDbService.batchFileFolderContent(movieId);
  }

  @Get('clean-up')
  async cleanUpFolder() {
    this.DbService.generateDb('aoaojiao');
    // return 'aa';
    const folder = '/Volumes/My Passport';
    return this.movieDbService.cleanUpFolder(folder);
  }

  /**
   * TODO: 功能还远没完成
   * @param folder
   */
  @Get('scanner')
  @Header('content-type', 'application/json')
  async scannerFolder(folder: string) {
    folder = `/Volumes/My Passport`;
    return this.movieDbService.scannerDb(folder, 'movie', 1);
  }

  @Get('all')
  async galleryAll() {
    return this.galleryService.allMovies();
  }

  @Get(':id')
  async getgalleryItem(@Param('id') id: string) {
    const movie = await this.galleryService.getMovieById(id);
    if (movie === -1) {
      throw new MovieException(-4001, 'can not find this movie');
    }
    return {
      code: 200,
      data: movie,
    };
  }

  @Get()
  async getHello(): // @Req() req: Request,
  Promise<{ name: string; poster: string; meta: string; fanart: string }[]> {
    const movieDb = this.movieDbService.getMovieDb();

    movieDb
      .searchMovie({ query: '杀破狼' })
      .then(() => {
        // console.log(res);
      })
      .catch(console.error);

    // console.log(process.cwd());
    const jsonDb = await fs.promises.readFile(
      join(process.cwd(), 'json-db/movie.json'),
      'utf8',
    );
    // console.log(jsonDb);
    const result = JSON.parse(jsonDb);
    // return new StreamableFile(jsonDb);
    return new Promise((resolve, reject) => {
      resolve(result);
      reject(result);
    });
  }
}
