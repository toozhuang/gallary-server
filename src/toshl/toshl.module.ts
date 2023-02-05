import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';
import { ToshlEntity } from './toshl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToshlEntity])],
  controllers: [ToshlController],
  providers: [ToshlService],
})
export class ToshlModule {}
