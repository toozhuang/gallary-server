import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';
import { ToshlEntity } from './toshl.entity';
import { CategoryEntity } from './entities/toshlCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToshlEntity, CategoryEntity])],
  controllers: [ToshlController],
  providers: [ToshlService],
})
export class ToshlModule {}
