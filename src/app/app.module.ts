import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { GalleryModule } from '../gallery/gallery.module';
import {
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import configuration from '../config/configuration';
import { OpenMovieModule } from '../open-movie/open-movie.module';
import { DbModule } from '../services/db/db.module';
import { TmdbModule } from '../services/tmdb/tmdb.module';
import { SettingModule } from '../setting/setting.module';
import { ToshlModule } from '../toshl/toshl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { I18nExceptionFilter } from '../common/filters/i18n-exception-fitler';
import { LoggingModule } from '../logging/logging.module';
import { ormConfig } from '../config/ormconfig';

@Module({
  imports: [
    // 全局载入环境变量相关的配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'], // 替换 '.env.prod'
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configureService: ConfigService) =>
        ormConfig(configureService),
    }),
    GalleryModule,
    OpenMovieModule,
    TmdbModule,
    DbModule,
    LoggingModule,
    ToshlModule,
    SettingModule,
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], //把 configService inject 到 factory 中
      useFactory: (i18nService: ConfigService) => {
        console.log(
          '我算是过来了',

          `${i18nService.get('db.mongodb.url')}`,
        );
        return {
          fallbackLanguage: 'cn', //appConfig.fallbackLanguage
          parserOptions: {
            path: path.join(__dirname, '../i18n/'),
            watch: true,
          },
        };
      },
      parser: I18nJsonParser,
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang', 'locale', 'l'],
        },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: I18nExceptionFilter,
    },
  ],
})
export class AppModule {}
