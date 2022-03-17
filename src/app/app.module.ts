import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { GalleryModule } from '../gallery/gallery.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import configuration from '../config/configuration';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    GalleryModule,
    DbModule,
    //   todo: 要设置 logger service 才好
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'], // 替换 '.env.prod'
      load: [configuration],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'cn',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '../i18n/'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {
  // constructor() {}
}
