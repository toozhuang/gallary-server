/**
 * date: 2023-02-13, Mon, 21:11
 * author: Wang
 * feature： 一个全局过滤的 filter， 通过依赖注入的方式，注入到module 中
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ApiStatusCodeListConstants } from '../constants/api-status-code-list.constants';
import { ValidationErrorInterface } from '../interfacts/validation-error.interfact';

@Catch(HttpException)
export class I18nExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(
    // todo： 暂时先不用 logger， 估计要明天才有时间添加logger了
    // 明天的日期是 2023-02-14, Tue, 21:11
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly i18n: I18nService,
  ) {}
  /**
   * 重写我们的http 异常过滤器方法
   * @param exception
   * @param host
   */
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return response
      .status(exception.getStatus())
      .json(
        await this.getMessage(
          exception,
          ctx.getRequest().i18nLang ||
            ctx.getRequest().headers['x-custom-lang'],
        ),
      );
  }

  async getMessage(exception: HttpException, lang: string) {
    try {
      const exceptionResponse = exception.getResponse() as any;
      if (!exceptionResponse.message && typeof exceptionResponse === 'string') {
        return await this.i18n.translate(`validation.${exceptionResponse}`, {
          lang,
          args: {},
        });
      }
      if (
        exceptionResponse.statusCode === HttpStatus.UNPROCESSABLE_ENTITY &&
        exceptionResponse.message instanceof Array
      ) {
        exceptionResponse.code = ApiStatusCodeListConstants.ValidationError;
        exceptionResponse.message = await this.translateArray(
          exceptionResponse.message,
          lang,
        );
      }
      return exceptionResponse;
    } catch (error) {
      // TODO: 需要添加 logger
      // this.logger.error('Error in I18nExceptionFilterPipe: ', {
      //   meta: {
      //     error,
      //   },
      // });
    }
  }

  async translateArray(errors: any[], lang: string) {
    const translatedErrors: ValidationErrorInterface[] = [];
    for (const error of errors) {
      const messageArray = error.message;
      const message = await Promise.all(
        messageArray.map((msg) => {
          return this.i18n.translate(`validation.${msg}`, {
            lang,
            args: { property: error.property },
          });
        }),
      ).catch((e) => {
        console.log('e: ', e);
        // todo: 需要在这里捕捉一下 i18n 可能出现的错误
      });

      translatedErrors.push({
        name: error.property,
        errors: message || messageArray,
      });
    }
    return translatedErrors;
  }
}
