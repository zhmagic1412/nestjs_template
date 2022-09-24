import {CACHE_MANAGER, ForbiddenException, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../app.config';
import { UserService } from '../../user/user.service';
import { JwtService } from "@nestjs/jwt";
import redisFactory from "../../common/redis/redis-factory";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService) {
    super({
      jwtFromRequest:  (req) => {
        const gToken  = req.headers['g-token'];
        if (!gToken) {
          throw new UnauthorizedException();
        }
        //const [, token] = authorization.split(' ');
        return gToken;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {

/*    const token = await redisFactory.get(0,`user_${payload.id}`)
    if (!token) {
      throw new UnauthorizedException();
    }*/

    const existUser = await this.usersService.findOne(payload.id);
    if (!existUser) {
      throw new ForbiddenException('token error');
    }

    //redisFactory.expire(0,`user_${payload.id}`,jwtConstants.expiresIn*60)


    return { ...payload, id: payload.id };
  }
}
