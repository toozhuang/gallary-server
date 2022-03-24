import { Controller, Get, Header, Param } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
// import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { MovieService } from '../app/movie.service';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly galleryService: GalleryService,
    private readonly movieDbService: MovieService,
  ) {
    // this.DbServices.generateDb('12315');
  }

  @Get('movie-folder/:id')
  async getMovieFolderDetail(@Param('id') movieId: string) {
    // const result = this.dbService.read();
    // return result;
    return this.movieDbService.batchFileFolderContent(movieId);
  }

  @Get('clean-up')
  async cleanUpFolder() {
    // this.DbServices.generateDb('aoaojiao');
    // const db = this.dbService.DB;
    // this.dbService.DB.data ||= { posts: [] };
    // const { posts } = db.data;
    // posts.push({ title: 'lowdb' });
    // this.dbService.write();
    // return this.dbService.DB.data;
    // return 'aa';
    // const folder = '/Volumes/My Passport';
    // return this.movieDbService.cleanUpFolder(folder);
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
  async getGalleryItem(@Param('id') id: string) {
    return this.galleryService.getMovieById(id);
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
