import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { ReadFileService } from './readFile.service';

@Module({
  providers: [GalleryService, ReadFileService],
  controllers: [GalleryController],
})
export class GalleryModule {}
