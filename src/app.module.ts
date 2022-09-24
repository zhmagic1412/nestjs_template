import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { mysqlConf } from './app.config';
import { EventsGateway } from './common/websocket/events.gateway';


@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConf),
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: join(__dirname, '..', 'static'),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', 'web'),
    }),
    AuthModule,
    UserModule,
    RoleModule
  ],

  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {
}
