import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';
import { ToshlEntity } from './toshl.entity';
import { CategoryEntity } from './entities/toshlCategory.entity';
import { APP_FILTER } from '@nestjs/core';
import { I18nExceptionFilter } from '../common/filters/i18n-exception-fitler';

@Module({
  imports: [TypeOrmModule.forFeature([ToshlEntity, CategoryEntity])],
  controllers: [ToshlController],
  providers: [ToshlService],
})
export class ToshlModule {}
