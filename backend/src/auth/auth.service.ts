import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync, hash } from "bcrypt";
import { KeyDto } from "../model/key.dto";
import {BearerTokenDto} from "../model/bearer-token.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}

    async login(userDto: KeyDto): Promise<BearerTokenDto> {

        console.log(await hash("123456789", 10))
        if (compareSync(userDto.key, process.env.USER_KEY)) {
            return {
                access_token: this.jwtService.sign({
                    role: "User",
                }),
            };
        }else if(compareSync(userDto.key, process.env.ADMIN_KEY)){
            return {
                access_token: this.jwtService.sign({
                    role: "Admin",
                }),
            };
        }
        throw new UnauthorizedException();
    }
}