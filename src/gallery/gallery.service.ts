import { Injectable } from '@nestjs/common';
import { DbService } from '../services/db/db.service';
import { Database } from '../dto/movieDB.types';
import { MovieException } from '../common/exceptions/movie.exception';

@Injectable()
export class GalleryService {
  constructor(private dbService: DbService) {}

  allMovies() {
    const movieList: Database[] = this.dbService.getByKey<Database>('movies');
    return {
      createTime: new Date(),
      version: new Date(),
      database: movieList,
    };
  }

  getMovieById(id: string) {
    const result = this.dbService.getMovieFiledById(id);
    if (result) {
      return { data: result };
    } else {
      throw new MovieException(404, 'not found');
    }
  }
}
