/**
 * date: 2022-03-23, Wed, 19:11
 * author: Wang
 * feature： 一个 Adapter， 使用 lowDB 的最开始的时候使用
 * 他是text file write 和 read 的包装
 * 读取和拿到的都是 基于 text 的 json 格式的数据
 */
import { SyncAdapter } from '../LowSync';
import { TextFileSync } from './TextFileSync';

export class JSONFileSync<T> implements SyncAdapter<T> {
  #adapter: TextFileSync; // 说的这里的 adapter 是一个 string 类型的 adapter

  constructor(filename: string) {
    // 通过传入 filename 给了我们 string adapter 一个 read 和 write 的能力
    // 要注意这里 read 和 write 的都是 string
    this.#adapter = new TextFileSync(filename);
  }

  /**
   * 从 filename （构造的时候传入）
   * 中读取 json 的信息
   * 且这个信息的json 样子可以在泛型的时候规划好了
   */
  read(): T | null {
    const data = this.#adapter.read();
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data) as T;
    }
  }

  /**
   * 把对象 T 改成 JSON 的样子， 写入到 文件中
   * @param data
   */
  write(data: T): void {
    this.#adapter.write(JSON.stringify(data, null, 2));
  }
}
