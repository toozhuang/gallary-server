import { Module } from '@nestjs/common';
import { Db } from './db';

@Module({
  providers: [Db],
  controllers: [],
  exports: [Db],
})
export class DbModule {}
