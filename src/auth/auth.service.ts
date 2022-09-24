import { CACHE_MANAGER, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../user/entities/user.entity";
import { jwtConstants } from '../app.config';
import { JwtService } from '@nestjs/jwt';
import redisFactory from "../common/redis/redis-factory";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { Role } from "../role/entities/role.entity";

@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UserService,
    private jwtService: JwtService,
    //@Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async register(createUserDto:CreateUserDto){
    const updateUserDto = new UpdateUserDto()
    updateUserDto.username = createUserDto.username
    updateUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    createUserDto.email&&(updateUserDto.email =  createUserDto.email)

    //注册默认普通权限
    const role = new Role()
    role.id = 2
    updateUserDto.roles = [role]

    const user = await this.userService.save(updateUserDto)
    const {password,roles,deleteTime,id, ...rest} = user
    return rest
  }

  async logout(id:number){
    const token = await redisFactory.get(0,`user_${id}`)
    if(token){
      await redisFactory.del(0,[`user_${id}`])
      return 'logout success'
    }else{
      return 'logout failed'
    }
  }

  async getAuthenticatedUser(username:string, password:string){
    const user:User = await this.userService.getUserByName(username)
    const pass = await bcrypt.compare(
      password,
      user?.password||''
    )
    if(!pass){
      throw new UnauthorizedException('username or password is wrong')
    }
    return user
  }

  async getToken(user: User) {
    const { password, ...restUser } = user;

    const payload = { ...restUser, id: user.id };
    const token = this.jwtService.sign(payload)

    //TODO redis 刷新token
    //redisFactory.set(0,`user_${user.id}`,token,jwtConstants.expiresIn*60)


    return {
      token,
      expiresIn: jwtConstants.expiresIn*60,
    };
  }

}
