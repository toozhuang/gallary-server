import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class GalleryService {
  constructor(private dbService: DbService) {}

  async allMovies() {
    return this.dbService.getByKey('movies');
  }

  async getMovieById(id: string): Promise<any | number> {
    return 0;

    // const database: IMovieDB = await this.db.OpenDB('movie', 1);
    // const index = this.db.FindItem(database, id);
    // if (index !== -1) {
    //   return database.database[index];
    // }
    // return -1;
  }
}
