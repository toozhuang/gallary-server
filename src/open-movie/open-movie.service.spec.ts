import { Test, TestingModule } from '@nestjs/testing';
import { OpenMovieService } from './open-movie.service';

describe('OpenMovieService', () => {
  let service: OpenMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenMovieService],
    }).compile();

    service = module.get<OpenMovieService>(OpenMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
