import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';


@Catch()
export class HttpFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost): any {
        console.log(error)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = error.status ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response.message ? error.response.message : error.message;


        response.status(status).send({
            statusCode: status,
            message
        });
    }
}