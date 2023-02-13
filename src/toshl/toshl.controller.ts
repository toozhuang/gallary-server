import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToshlService } from './toshl.service';
import { ToshlRecord } from '../dto/toshlRecord';
import { ApiBody } from '@nestjs/swagger';
import { ToshlCategory } from '../dto/toshlCategory';

@Controller('toshl')
export class ToshlController {
  constructor(private readonly toshlService: ToshlService) {}

  @Get()
  async galleryAll() {
    return this.toshlService.getAll();
  }

  @Post()
  async insertOne(@Body() toshl: ToshlRecord) {
    return this.toshlService.insertOne(toshl);
  }

  // 导入的方法， 用来导入json数据， 插入到对应的数据库表中去
  // Note， 但是想了又想， 还是先把创建做出来，
  // 导入这种到最后再去实现可能性价比更高
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
    console.log('toshl: ', toshlCategory);
    return this.toshlService.insertCategory(toshlCategory);
  }
}
