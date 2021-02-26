import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import { AppModule } from './app.module';
import {LoggingInterceptor} from "./util/logging.interceptor";
import {HttpFilter} from "./util/http.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.enableCors();
  app.useGlobalFilters(new HttpFilter());

  await app.listen(3000);
}
bootstrap();
