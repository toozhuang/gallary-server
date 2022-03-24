import { Injectable } from '@nestjs/common';
import { TmdbService } from '../services/tmdb/tmdb.service';
import { DbService } from '../services/db/db.service';

@Injectable()
export class OpenMovieService {
  constructor(private tmdService: TmdbService, private serviceh: DbService) {}

  async searchMovie(movieName) {
    const moviedb = this.tmdService.tmDB;
    try {
      const res = await moviedb.searchMovie({ query: movieName });
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
