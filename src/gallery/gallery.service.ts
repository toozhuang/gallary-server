import { Injectable } from '@nestjs/common';
import DB, { DBType, IMovieDB } from '../common/db/json-db';

@Injectable()
export class GalleryService {
  private readonly db: DBType;
  constructor() {
    this.db = DB;
  }

  async allMovies() {
    const result = await this.db.OpenDB('movie', 1);
    return result;
  }

  async getMovieById(id: string): Promise<any | number> {
    const database: IMovieDB = await this.db.OpenDB('movie', 1);
    const index = this.db.FindItem(database, id);
    if (index !== -1) {
      return database.database[index];
    }
    return -1;
  }
}
