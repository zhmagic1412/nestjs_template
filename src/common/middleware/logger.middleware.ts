import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../log4js/log4js';


// 函数式中间件
export function loggerMiddleware(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();

  // 组装日志信息
  const logFormat = JSON.stringify(
    {
      method:req.method,
      url:req.originalUrl,
      ip:req.ip,
      type:'access'
    }
  )
    //`method:${req.method}; url:${req.originalUrl}; ip:${req.ip}`;

  Logger.access(logFormat);
  Logger.log(logFormat);
  // // 根据状态码，进行日志类型区分
  // if (code >= 500) {
  //   Logger.error(logFormat);
  // } else if (code >= 400) {
  //   Logger.warn(logFormat);
  // } else {
  //   Logger.access(logFormat);
  //   Logger.log(logFormat);
  // }
}