import { Module } from '@nestjs/common';
import {DatabaseModule} from "./database/database.module";
import {JwtConfigService} from "./util/JwtConfigService";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {audioProvider} from "./provider/audio.provider";
import {AuthService} from "./auth/auth.service";
import {AuthController} from "./auth/auth.controller";
import {AudioService} from "./audio/audio.service";
import {AudioController} from "./audio/audio.controller";
import {JwtStrategy} from "./auth/ jwt.strategy";
import {MulterModule} from "@nestjs/platform-express";
import {RateLimiterInterceptor, RateLimiterModule} from 'nestjs-rate-limiter';
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './audio',
    }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    PassportModule,
    DatabaseModule,
    RateLimiterModule
  ],
  controllers: [AuthController, AudioController],
  providers: [
    ...audioProvider,
    AuthService,
    AudioService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },

  ],
})
export class AppModule {}
