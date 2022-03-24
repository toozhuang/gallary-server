/**
 * date: 2022-03-24, Thu, 22:38
 * author: Wang
 * feature： 全局使用的 tmdb service 基类
 */
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

const { MovieDb } = require('moviedb-promise');

@Injectable()
export class TmdbService {
  public tmDB;

  constructor(private readonly configService: ConfigService) {
    // 从这里拿取全局的 API Key
  }

  public init() {
    this.tmDB = new MovieDb(this.configService.get('movie.api_key'));
  }
}
