import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as moment from 'moment';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        console.warn(`${moment().format('YYYY.MM.DD-HH:mm.ss.SSS ZZ')} Incoming Request ${request.url}`);
        return next.handle();
    }
}