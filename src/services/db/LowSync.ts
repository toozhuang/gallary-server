/**
 * date: 2022-03-23, Wed, 19:10
 * author: Wang
 * feature： 同步 Adapter
 */

import { MissingAdapterError } from '../../common/exceptions/movie.exception';

/**
 * 提供基础的 read 和 write 的功能
 */
export interface SyncAdapter<T> {
  read: () => T | null; // 读方法， 返回 string 类型（assume T is string
  write: (data: T) => void; // 写方法， 传入 string 类型
}

export class LowSync<T = unknown> {
  // 这个时候就可以用基础的 adapter 了
  // 但实际上 最终用的时候是这个接口的实现
  adapter: SyncAdapter<T>;
  data: T | null = null;

  constructor(adapter: SyncAdapter<T>) {
    if (adapter) {
      this.adapter = adapter;
    } else {
      throw new MissingAdapterError('Missing Adapter');
    }
  }

  public read(): void {
    this.data = this.adapter.read();
  }

  public write(): void {
    if (this.data !== null) {
      this.adapter.write(this.data);
    }
  }
}
