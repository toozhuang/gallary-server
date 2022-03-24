# Gallery Server

1. lowdb 操作 json 来存储数据， lowdb 使用 version 1 （nestjs 不支持 ESModule,所以自己参考 lowdb 的写法 写了一份代码， 存储在项目中。
2. 项目的 service 的构成为 包裹类型， 最底层是 db service 也就是上面的基于 lowdb 的一个 service， 再上层为 movie service， 以 movie 为原子，基于其的相关业务的扩充和完善
3. 而其他的类似 gallery， setting， open-movie 都是调用其自身范围内的 API 之后， 如果有需要对 movie 进行操作的， 再去调用 movie 就好

目前先这样， 写着写着肯定还会改
