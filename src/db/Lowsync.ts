/**
 * date: 2022-03-23, Wed, 19:10
 * author: Wang
 * feature： 同步 Adapter
 */

export interface SyncAdapter<T> {
  read: () => T | null; // 读方法， 返回 string 类型（assume T is string
  write: (data: T) => void; // 写方法， 传入 string 类型
}
