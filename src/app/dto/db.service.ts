/**
 * date: 2022-03-16, Wed, 21:19
 * author: Wang
 * feature： Class 类型的 Db control
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  // name = 'hoa a y';
  private db;

  generateDb(dbs: string) {
    this.db = dbs;
  }
  tellDb() {
    return this.db;
  }
}

let instance;

export default () => {
  if (instance) return instance;
  // instance = new Db('y');
  return instance;
};
