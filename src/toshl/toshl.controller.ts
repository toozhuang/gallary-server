import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ToshlService } from './toshl.service';
import { ToshlRecord } from '../dto/toshlRecord';
import { ToshlCategory } from '../dto/toshlCategory';
import { error, Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('toshl')
export class ToshlController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly toshlService: ToshlService,
  ) {}

  @Get()
  async galleryAll() {
    return this.toshlService.getAll();
  }

  @Post()
  async insertOne(@Body() toshl: ToshlRecord) {
    return this.toshlService.insertOne(toshl);
  }

  // {
  //     "id": "72191304",
  //     "name": "菜场",
  //     "name_override": false,
  //     "modified": "2023-02-02 12:22:32.311",
  //     "type": "expense",
  //     "category": "69876114",
  //     "deleted": false,
  //     "meta_tag": false
  // }
  @Post('category')
  async insertCategory(@Body() toshlCategory: ToshlCategory) {
    return this.toshlService.insertCategory(toshlCategory);
  }
}
