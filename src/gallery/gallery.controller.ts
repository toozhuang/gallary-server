import { Controller, Get } from '@nestjs/common';
import { ReadFileService } from './readFile.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly readFileService: ReadFileService) {}

  @Get()
  getHello(): Promise<any> {
    return this.readFileService.readFolder('/Users/wang/Documents');
  }
}
