import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ResultTransformInterceptor } from "./common/interceptor/result-transform.interceptor";
import { AllExceptionFilter } from "./common/filter/all-exception.filter";
import { loggerMiddleware } from './common/middleware/logger.middleware';
import {appPort} from "./app.config";
async function bootstrap() {

  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn','log','debug'],
  });

  //日志中间件
  app.use(loggerMiddleware)

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(
    //异常处理 日志
    new AllExceptionFilter()
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    //返回统一拦截 日志
    new ResultTransformInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe(
    {
      transform:true
    }
  ));

  app.enableCors();
  await app.listen(appPort);
}
bootstrap();
