import { Injectable } from '@nestjs/common';
import { JSONFileSync } from './adapters/JSONFileSync';
import { LowSync } from './LowSync';

type Data = {
  posts: Post[];
};

type Post = {
  title: string;
};

@Injectable()
export class DbService {
  public DB: LowSync<Data>;

  public init(dbLocation: string) {
    // adapter read write
    const adapter = new JSONFileSync<Data>(dbLocation);
    this.DB = new LowSync<Data>(adapter);
  }

  public read() {
    this.DB.read(); // 读取了以后， data存储在 this.DB 对象中了
    return this.DB.data;
  }

  public write() {
    // something
    // todo: 后面这个 low sync 的逻辑是 db 是自己内部 class 控制
    return this.DB.write();
  }
}
