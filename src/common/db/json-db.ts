import { join } from 'path';
import * as fs from 'fs';
import { INfometa } from '../../dto/movie.interface';

/**
 * date: 2022-03-2, Wed, 21:23
 * author: TooZhun9
 * feature： 集中暴露对于 json 文件的增删改查操作
 */

export interface IMovieDB {
  createTime: string;
  version: number;
  database: any[];
}

export interface ICreateDB {
  (name: string, version: number): void;
}

const CreateDB: ICreateDB = async (name = 'movie', version: number) => {
  // console.log('tesst here');
  //  todo: 判断是否存在这个 DB
  await fs.promises.writeFile(
    join(process.cwd(), `json-db/${name}.json`),
    JSON.stringify({
      createTime: '03-03-2022',
      database: [],
      version,
    }),
  );
  return true;
};

export interface IExistDB {
  (name: string, version: number): Promise<boolean> | any;
}

const ExistDB: IExistDB = async (name: string) => {
  try {
    // check the db exist status
    // const jsonDb =
    await fs.promises.readFile(
      join(process.cwd(), `json-db/${name}.json`),
      'utf8',
    );
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.log(e);
    throw e;
  }
};

interface IOpenDB {
  (name: string, version: number): Promise<IMovieDB>;
}

const OpenDB = async (name: string) => {
  try {
    // check the db exist status
    const db = await fs.promises.readFile(
      join(process.cwd(), `json-db/${name}.json`),
      'utf8',
    );
    return JSON.parse(db);
  } catch (e) {
    throw e;
  }
};

export interface IInsertDB {
  (jsonDbObj: any, movieItem: INfometa): void;
}

const InsertItem = (dbjson: IMovieDB, item: INfometa) => {
  const movies = dbjson.database;
  if (FindItem(dbjson, item.movie.id) !== -1) {
  } else {
    movies.push(item.movie);
  }
  dbjson.database = movies;

  return dbjson;
};

export interface IFindItemDB {
  (jsonDbObj: any, itemId: string): number;
}

const FindItem = (dbjson: IMovieDB, itemId: string) => {
  const { database: movies } = dbjson;
  const hasItem = -1;
  for (let index = 0; index < movies.length; index++) {
    if (movies[index].id === itemId) {
      return index;
    }
  }
  return hasItem;
};

export interface ISaveDB {
  (jsonDbObj: any): void;
}

const SaveDB: ISaveDB = async (dbjson: IMovieDB) => {
  await fs.promises.writeFile(
    join(process.cwd(), 'json-db/movie.json'),
    JSON.stringify(dbjson),
  );
};

export interface DBType {
  CreateDB: ICreateDB;
  ExistDB: IExistDB;
  OpenDB: IOpenDB;
  InsertItem: IInsertDB;
  SaveDB: ISaveDB;
  FindItem: IFindItemDB;
}

const DB: DBType = {
  CreateDB,
  ExistDB,
  OpenDB,
  InsertItem,
  SaveDB,
  FindItem,
};

export default DB;
