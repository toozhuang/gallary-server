import { Injectable } from '@nestjs/common';

const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

@Injectable()
export class DbService {
  async init() {
    const adapter = new FileSync('./json-db/movieDatabase.json');
    const db = new Low(adapter);
    db.read();
    console.log(db);

    console.log(db.get('movies').value());
  }
}
