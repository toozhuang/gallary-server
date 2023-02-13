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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wang',
      password: 'wang',
      database: 'wang-box',
      autoLoadEntities: true,
      synchronize: false,
    }),
    GalleryModule,
    OpenMovieModule,
    TmdbModule,
    DbModule,
    ToshlModule,
    SettingModule,
    //   todo: 要设置 logger service 才好
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'], // 替换 '.env.prod'
      load: [configuration],
    }),
    // I18nModule.forRoot({
    //   fallbackLanguage: 'cn',
    //   parser: I18nJsonParser,
    //   parserOptions: {
    //     path: path.join(__dirname, '../i18n/'),
    //   },
    // }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'cn', //appConfig.fallbackLanguage
        parserOptions: {
          path: path.join(__dirname, '../i18n/'),
          watch: true,
        },
      }),
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
