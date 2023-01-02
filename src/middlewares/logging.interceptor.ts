import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import logger from 'configuration/logger.service';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<object>): Observable<object> | Promise<Observable<object>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map(data => {
        logger.log.trace({
          request: {
            method: request.method,
            url: request.url,
            body: request.body,
          },
          response: {
            ...data,
            statusCode: response.statusCode,
          },
        });
        return data;
      })
    );
  }
}
