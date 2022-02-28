import { Injectable, NestMiddleware } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class MoviedbConfigureMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    // todo: 这里以配置的方式传入到后面的 router 中
    const configuration = await fs.promises.readFile(
      join(process.cwd(), 'json-db/configure.json'),
      'utf8',
    );
    const configJson = JSON.parse(configuration);
    req.movieDbConfig = configJson;
    console.log(configJson);
    next();
  }
}
