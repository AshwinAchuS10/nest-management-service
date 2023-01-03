import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        exception = exception.getResponse();
        return {
            errorMetadata: {
                host: host.getType(),
                resource: host.getArgs()[1].args[1]
            },
            errors: exception?.message,
            message: exception?.error,
            status: exception?.statusCode
        };
    }
}
