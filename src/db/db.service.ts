import { Injectable } from '@nestjs/common';

const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

@Injectable()
export class DbService {
  private DB: any;

  public init(dbLocation: string) {
    const adapter = new FileSync(dbLocation);
    this.DB = new Low(adapter);
  }

  public get() {
    return this.DB;
  }
}
