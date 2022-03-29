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

  @Post('create-movie')
  createMovie(@Body('movieDetail') movie) {
    const { id } = movie;
    console.log('id: ', id);
    const { title } = movie;
    // 这边会首先接受用户前端传入的参数
    // 然后当前阶段的一些其他的信息，则通过 open api 来获取（后端）
    // console.log(movie);
    return 'success';
  }
}
