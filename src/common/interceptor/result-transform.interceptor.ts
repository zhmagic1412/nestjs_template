import {CallHandler, ExecutionContext, Injectable,NestInterceptor,} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../log4js/log4js';
import {ApiResultCode} from "../response/api-result-code";

@Injectable()
export class ResultTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.getArgByIndex(1).req;
    const reqLogFormat = {
      method:req.method,
      url:req.originalUrl,
      ip:req.ip,
      params:req.params,
      query:req.query,
      body:req.body,
      type:'params'
    }
    //`method:${req.method}; url:${req.originalUrl}; ip:${req.ip};params:${JSON.stringify(req.params)};query:${JSON.stringify(req.query)};body:${JSON.stringify(req.body)}`;
    Logger.log(JSON.stringify(reqLogFormat));
    return next.handle().pipe(
      map((data) => {
        // 组装日志信息
        const resLogFormat = {
          code:ApiResultCode.Success,
          data,
          type:'res'
        }
          //`status:200; data:${JSON.stringify(data)}`;
        Logger.log(JSON.stringify(resLogFormat));
        return {
          code: ApiResultCode.Success,
          message: 'success',
          data,
        };
      }),
    );
  }
}
