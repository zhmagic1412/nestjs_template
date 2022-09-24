import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Role } from "../../role/entities/role.entity";

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty()
  id: number;

  @ApiProperty()
  roles: Role[]
}
