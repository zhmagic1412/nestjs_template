import { Column, ManyToMany } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { JoinTable } from "typeorm/browser";
import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string | null;

  // @ApiProperty()
  // roles: number[]

}
