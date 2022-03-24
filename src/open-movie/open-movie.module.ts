import { Module } from '@nestjs/common';
import { OpenMovieController } from './open-movie.controller';
import { OpenMovieService } from './open-movie.service';

@Module({
  controllers: [OpenMovieController],
  providers: [OpenMovieService],
})
export class OpenMovieModule {}
