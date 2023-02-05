import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToshlEntity } from './toshl.entity';
import { ToshlService } from './toshl.service';

@Controller('toshl')
export class ToshlController {
  constructor(private readonly toshlService: ToshlService) {}

  @Get()
  async galleryAll() {
    // return 'nihaoma'
    return this.toshlService.getAll();
  }

  @Get('insert')
  async insertOne() {
    return this.toshlService.insertOne();
  }
}
