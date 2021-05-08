import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../model/roles.enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);