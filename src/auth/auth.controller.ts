import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    UnauthorizedException
} from "@nestjs/common";
import {AuthService} from './auth.service';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {ApiBody} from "@nestjs/swagger";
import {LoginDto} from './dto/login.dto'
import JwtAuthGuard from "./guards/jwt-auth.guard";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {RbacGuard} from "./guards/rbac.guard";
import {RoleType} from "./enums/role.enum";
import {ChangePasswordDto} from "./dto/change-password.dto";
import * as bcrypt from "bcrypt";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UserService) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.getUserByName(createUserDto.username)
        if (user) {
            throw new UnauthorizedException('the username exists')
        }
        return this.authService.register(createUserDto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({type: LoginDto})
    login(@Req() req) {
        return this.authService.getToken(req.user);
    }

    @UseGuards(new RbacGuard([RoleType.ADMIN]))
    @UseGuards(JwtAuthGuard)
    @Post('deleteUser')
    async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
        const auth = this.authService.getAuthenticatedUser(deleteUserDto.username, deleteUserDto.password);
        if (!auth) {
            throw new UnauthorizedException('the username or the password is wrong')
        } else {
            const user = await this.usersService.getUserByName(deleteUserDto.username)
            return this.usersService.remove(user.id)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post('changePassword')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        const auth = this.authService.getAuthenticatedUser(changePasswordDto.username, changePasswordDto.oldPassword);
        if (!auth) {
            throw new UnauthorizedException('the username or the password is wrong')
        } else {
            const user = await this.usersService.getUserByName(changePasswordDto.username)
            user.password =  await bcrypt.hash(changePasswordDto.newPassword, 10)
            await this.usersService.save(user)
            return ''
        }
    }


    /*  @Post('logout')
      @UseGuards(JwtAuthGuard)
      logout(@Query("id") id: number){
        return this.authService.logout(id);
      }*/

}
