import { Injectable } from '@nestjs/common';
import DB, { DBType } from '../common/json-db';

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
}
