import { Module } from '@nestjs/common';
import { OpenMovieController } from './open-movie.controller';
import { OpenMovieService } from './open-movie.service';
import { DbModule } from '../services/db/db.module';
import { TmdbModule } from '../services/tmdb/tmdb.module';

@Module({
  imports: [DbModule, TmdbModule],
  controllers: [OpenMovieController],
  providers: [OpenMovieService],
})
export class OpenMovieModule {}
