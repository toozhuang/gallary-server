import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Wang's Box example")
    .setDescription("The Wang's Box API description")
    .setVersion('1.0')
    .addTag('box')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 激活全局的 validate pipe
  // 可以和我们的 class validator 一起使用
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['https://www.wang.today', 'http://localhost:3000'],
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
