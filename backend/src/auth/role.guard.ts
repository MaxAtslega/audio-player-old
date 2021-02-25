import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesEnum } from "../model/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<RolesEnum[]>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        return roles.includes(request.user.role);
    }
}