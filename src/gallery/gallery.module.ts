import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { ReadFileService } from './readFile.service';
import { AppService } from '../app.service';

@Module({
  providers: [GalleryService, ReadFileService, AppService],
  controllers: [GalleryController],
})
export class GalleryModule {
  constructor(movieService: AppService) {
    // note: 获取 configure 配置信息，
    // 并讲该信息以 json 的方式写入到 文件夹中
    // 只有后续再出错的情况下才去更新该配置文件
    movieService.setConfiguration();
  }
}
