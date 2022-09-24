import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {Logger} from '../log4js/log4js';
import {ApiResultCode} from "../response/api-result-code";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        //const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = (exception as Error).message //|| 'Internal Error'
        let code = 0



        /*
        * status处理 统一返回200
        * */
        if (status >= 500) {
            code = ApiResultCode.ServerErr
        } else if (status == 400 || status == 401 || status == 403) {
            //400 BadRequestException
            //401 UnauthorizedException
            //403 ForbiddenException
            const codeMap = {
                400: ApiResultCode.ParameterErr,
                401: ApiResultCode.AuthErr,
                403: ApiResultCode.TokenErr
            }
            code = codeMap[status]
        } else {
          code = ApiResultCode.UnknownErr
        }

        const logFormat = JSON.stringify({code, message, type: 'res'})
        //`status:${status}; message:${message}`;
        Logger.error(logFormat);

        response.status(200).json({
            code,
            message,
            time: new Date().toISOString(),
        });
    }
}
