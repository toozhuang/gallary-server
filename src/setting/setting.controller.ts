import { Body, Controller, Post } from '@nestjs/common';

@Controller('setting')
export class SettingController {
  @Post('create-movie')
  createMovie(@Body('movieDetail') movie) {
    console.log(movie);
    return 'success';
  }
}
