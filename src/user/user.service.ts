import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../role/entities/role.entity";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private dao:Repository<User>
  ) {

  }
  save(updateUserDto: UpdateUserDto) {
    if( updateUserDto.id){
      updateUserDto.id  = Number( updateUserDto.id)
    }
    // const roles:Role[] = updateUserDto.roles.map(
    //   id=>{
    //     const role = new Role()
    //     role.id = id
    //     return role
    //   }
    // )
    const user = { ...updateUserDto}
    return this.dao.save(user)
  }

  getUserByName(username:string){
    return this.dao.findOne({ where:{username},relations:['roles'] })
  }

  findOne(id: number) {
    return this.dao.findOne({where:{id}});
  }

  remove(id:number){
    return this.dao.softDelete(id)
  }

}
