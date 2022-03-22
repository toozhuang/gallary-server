/**
 * date: 2022-03-22, Tue, 8:55
 * author: Wang
 * feature： 基类
 */
import stringify from './stringify';

class Base {
  source: string;
  serialize: (obj) => string;
  defaultValue: any;
  deserialize: (
    text: string,
    reviver?: (this: any, key: string, value: any) => any,
  ) => any;

  constructor(source: string) {
    this.source = source;

    this.defaultValue = {};
    this.serialize = stringify;
    this.deserialize = JSON.parse;
  }
}

export default Base;
