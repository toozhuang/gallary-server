import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ToshlService } from './toshl.service';
import { ToshlRecord } from '../dto/toshlRecord';
import { ToshlCategory } from '../dto/toshlCategory';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('toshl')
export class ToshlController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly toshlService: ToshlService,
  ) {}

  @Get()
  async galleryAll(@Request() toshl: any) {
    return this.toshlService.getAll();
  }

  @Post()
  async insertOne(@Body() toshl: ToshlRecord) {
    return this.toshlService.insertOne(toshl);
  }

  @Post('category')
  async insertCategory(@Body() toshlCategory: ToshlCategory) {
    return this.toshlService.insertCategory(toshlCategory);
  }
}
