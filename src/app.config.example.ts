import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: 60*12, //分钟
}

export const mysqlConf:TypeOrmModuleOptions = {
  type: "mysql",
  host: "",
  port: 3306,
  username: "",
  password: "",
  database: "",
  autoLoadEntities: true,
  synchronize: false
}

export const redisConf = {
  host: "",
  port: 6379,
  username: "",
  password: "",
}

export const appPort = 3001

