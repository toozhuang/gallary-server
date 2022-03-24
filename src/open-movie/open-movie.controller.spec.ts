import { Test, TestingModule } from '@nestjs/testing';
import { OpenMovieController } from './open-movie.controller';

describe('OpenMovieController', () => {
  let controller: OpenMovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenMovieController],
    }).compile();

    controller = module.get<OpenMovieController>(OpenMovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
