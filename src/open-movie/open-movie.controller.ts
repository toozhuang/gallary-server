import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('open-movie')
export class OpenMovieController {
  @Get('all')
  async galleryAll() {
    return 'aoaoatest';
  }

  @Post('name')
  searchMovieByName(@Body('name') movieName) {
    console.log(movieName);
    return 'k';
  }
}
