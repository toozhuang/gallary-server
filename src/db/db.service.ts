import { Injectable } from '@nestjs/common';
import { JSONFileSync } from './adapters/JSONFileSync';
import { LowSync } from './LowSync';
import { Movie } from '../dto/movieDB.types';

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
  public getByKey(key: keyof Movie) {
    return this.DB.data[key];
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
