import { Injectable } from '@nestjs/common';
import { JSONFileSync } from './adapters/JSONFileSync';
import { LowSync } from './LowSync';
import {
  Database,
  Movie,
  TimeRecords,
  VersionRecords,
} from '../../dto/movieDB.types';

type Timo = TimeRecords | Database | VersionRecords;
type ArrayTimo = Database | VersionRecords;

@Injectable()
export class DbService {
  private DB: LowSync<Movie>;

  public init(dbLocation: string) {
    // adapter read write
    const adapter = new JSONFileSync<Movie>(dbLocation);
    this.DB = new LowSync<Movie>(adapter);
    this.DB.read(); // init 的时候 默认先 read 一次
  }

  /**
   * key 为 该 json 文件的键值
   * @param key
   */
  public getByKey<T extends Timo>(key: string): T[] {
    return this.DB.data[key];
  }

  public getMovieFiledById(id: string): Database {
    const result = this.getArrayFieldsById<Database>('movies', id);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  private getArrayFieldsById<T extends ArrayTimo>(
    key: string,
    id: string,
  ): T[] {
    console.log('id', id);
    return this.DB.data[key].filter((item) => item.id === id);
  }

  public refreshDB() {
    this.DB.read(); // 读取了以后， data存储在 this.DB 对象中了 read 的操作才会读取， 不read 不读取
  }

  public commitDB() {
    // something
    // todo: 后面这个 low sync 的逻辑是 db 是自己内部 class 控制
    return this.DB.write();
  }
}
