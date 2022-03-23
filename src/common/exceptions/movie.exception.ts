/**
 * date: 2022-03-2, Wed, 23:54
 * author: TooZhun9
 * feature： 自定义异常 - movie
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class MovieException extends HttpException {
  constructor(errorCode: number, errorMsg: string) {
    super({ errorCode, errorMsg }, HttpStatus.OK); // STATUS OK 前端通过errocode 和 errormsg 来确定错误内容
  }
}

export class MissingAdapterError extends HttpException {
  constructor(errorMsg: string) {
    const errorCode = 110; // 110 是系统内部矛盾
    super({ errorCode, errorMsg }, HttpStatus.OK); // STATUS OK 前端通过errocode 和 errormsg 来确定错误内容
  }
}
