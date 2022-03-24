import { Get, Header, Injectable } from '@nestjs/common';
import { ReadFileService } from '../services/readFile.service';
import { MovieService } from '../services/movie/movie.service';

@Injectable()
export class SettingService {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly movieDbService: MovieService,
  ) {
    // this.DbServices.generateDb('12315');
  }

  /**
   * TODO: 功能还远没完成
   * @param folder
   */
  @Get('scanner')
  @Header('content-type', 'application/json')
  async scannerFolder(folder: string) {
    folder = `/Volumes/My Passport`;
    return this.movieDbService.scannerDb(folder, 'movie', 1);
  }
}
