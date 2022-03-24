import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenMovieService } from './open-movie.service';

@Controller('open-movie')
export class OpenMovieController {
  constructor(private readonly openMovieService: OpenMovieService) {}

  @Get('all')
  async galleryAll() {
    return 'aoaoatest';
  }

  @Post('name')
  async searchMovieByName(@Body('name') movieName) {
    return this.openMovieService.searchMovie(movieName);
  }
}
