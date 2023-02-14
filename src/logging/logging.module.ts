/**
 * date: 2023-02-14, Tue, 10:2
 * author: Wang
 * feature： 专门处理日志实务的module
 */
import { Logger, LoggerService, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    }),
  ],
  providers: [],
  exports: [],
})
export class LoggingModule {}
