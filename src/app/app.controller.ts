import { Controller, Get } from '@nestjs/common';
import { DbService } from './dto/db.service';

@Controller()
export class AppController {
  constructor(private readonly db: DbService) {}

  @Get()
  haha() {
    console.log('十来了吧');
    return this.db.tellDb();
  }
}
