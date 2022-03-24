import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Database } from '../dto/movieDB.types';
import { MovieException } from '../common/exceptions/movie.exception';

@Injectable()
export class GalleryService {
  constructor(private dbService: DbService) {}

  allMovies(): Database[] {
    return this.dbService.getByKey<Database>('movies');
  }

  getMovieById(id: string) {
    const result = this.dbService.getMovieFiledById(id);
    if (result) {
      return result;
    } else {
      throw new MovieException(404, 'not found');
    }
  }
}
