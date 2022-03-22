/**
 * date: 2022-03-22, Tue, 22:28
 * author: Wang
 * feature： 同步读取文件，对fs的包装
 */
import Base from './Base';

const fs = require('graceful-fs');

class FileSync {
  private base: any;
  constructor(sourceLocation: string) {
    this.base = new Base(sourceLocation);
  }
}

export default FileSync;
