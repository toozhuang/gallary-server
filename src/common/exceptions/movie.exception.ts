/**
 * date: 2022-03-2, Wed, 23:54
 * author: TooZhun9
 * feature： 自定义异常 - movie
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class MovieException extends HttpException {
  constructor(errorCode: number, errorMsg: string) {
    super({ errorCode, errorMsg }, HttpStatus.OK);
  }
}
