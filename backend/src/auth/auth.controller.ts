import {Body, Controller, Post, UseInterceptors} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { KeyDto } from "../model/key.dto";

import {BearerTokenDto} from "../model/bearer-token.dto";
import {RateLimit, RateLimiterInterceptor} from "nestjs-rate-limiter";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @RateLimit({
        points: 4,
        duration: 15
    })
    async login(@Body() body: KeyDto): Promise<BearerTokenDto> {
        return this.authService.login(body);
    }
}