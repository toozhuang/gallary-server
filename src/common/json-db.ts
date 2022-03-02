import { join } from 'path';
import * as fs from 'fs';

/**
 * date: 2022-03-2, Wed, 21:23
 * author: TooZhun9
 * feature： 集中暴露对于 json 文件的增删改查操作
 */

interface IExistDB {
  (name: string, version: number): Promise<boolean>;
}

interface ICreateDB {
  (name: string, version: number): void;
}

interface IOpenDB {
  (name: string, version: number): any;
}

const createDB: ICreateDB = (name = 'movie', version: number) => {
  //  todo: 判断是否存在这个 DB
};

const existDB: IExistDB = async (name: string, version: number) => {
  try {
    // check the db exist status
    const jsonDb = await fs.promises.readFile(join(process.cwd(), `json-db/${name}.json`), 'utf8');
    return true;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const openDB = async (name: string, version: number) => {
  try {
    // check the db exist status
    return await fs.promises.readFile(join(process.cwd(), `json-db/${name}.json`), 'utf8');
  } catch (e) {
    throw e;
  }
};

export interface DBType {
  createDB: ICreateDB;
  existDB: IExistDB;
  openDB: IOpenDB;
}

const DB: DBType = {
  createDB,
  existDB,
  openDB,
};

export default DB;
