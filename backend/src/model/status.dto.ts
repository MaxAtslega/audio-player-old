import { StatusCodesEnum } from './status-codes.enum';

export interface StatusDto {
    status: StatusCodesEnum;
    message?: any;
}