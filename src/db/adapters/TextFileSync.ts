/**
 * date: 2022-03-23, Wed, 19:18
 * author: Wang
 * feature： 一个写入 string 方法（text 的 fs 包装器
 */

import * as fs from 'fs';
import * as path from 'path';

// lowdb libs
import { SyncAdapter } from '../LowSync';

export class TextFileSync implements SyncAdapter<string> {
  #tempFilename: string;
  #filename: string;

  constructor(filename: string) {
    this.#filename = filename; // 外界传入 filename 并使用

    // 注意下面这个是这样的用法
    // 获取传入的 filename的 dir， 然后在这个地方新建一个以 tmp 命名的
    // console.log(__filename);
    // // Prints: /Users/mjr/example.js
    // console.log(__dirname);
    // // Prints: /Users/mjr
    this.#tempFilename = path.join(
      path.dirname(filename),
      `.${path.basename(filename)}.tmp`,
    );
  }

  /**
   * 读取实例化以后的传入的文件的这个地址
   */
  read(): string | null {
    let data;
    try {
      data = fs.readFileSync(this.#filename, 'utf-8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        // console.log() todo: 这里要 log error
        return null;
      }
      throw e;
    }
    console.log('是吗');
    return data;
  }

  /**
   * 为什么上面要有一个 tmp
   * 原因就是这样分层次的两部分的写入
   * @param data
   */
  write(data: string): void {
    fs.writeFileSync(this.#tempFilename, data);
    fs.renameSync(this.#tempFilename, this.#filename);
  }
}
