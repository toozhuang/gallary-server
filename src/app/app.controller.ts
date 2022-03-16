import { Controller, Get } from '@nestjs/common';
import { Db } from './dto/db';

@Controller()
export class AppController {
  constructor(private readonly db: Db) {}

  @Get()
  haha() {
    console.log('十来了吧');
    return this.db.tellDb();
  }
}
