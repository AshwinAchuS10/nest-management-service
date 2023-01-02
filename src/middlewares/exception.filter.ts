import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        console.log('exception: ', exception);
        const status = exception instanceof HttpException

            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException({
            statusCode: status,
            message: exception?.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        }, status);
    }
}