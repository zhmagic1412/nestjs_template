import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleType } from "../enums/role.enum";

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly roleList: RoleType[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user.roles.some(i=>i.id == RoleType.ADMIN)){
      throw new ForbiddenException('the role forbidden');
    }
    return true;
  }
}