import { Controller, Get } from '@nestjs/common';
import { ReadFileService } from './readFile.service';
import { join } from 'path';
import * as fs from 'fs';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly readFileService: ReadFileService) {}

  @Get()
  async getHello(): Promise<{ name: string; poster: string; meta: string; fanart: string }[]> {
    console.log(process.cwd());
    const jsonDb = await fs.promises.readFile(join(process.cwd(), 'json-db/movie.json'), 'utf8');
    // console.log(jsonDb);
    const result = JSON.parse(jsonDb);
    // return new StreamableFile(jsonDb);
    return new Promise((resolve, reject) => {
      resolve(result);
      reject(result);
    });
    // return this.readFileService.readFolder('/Users/wang/Documents');
  }
}
