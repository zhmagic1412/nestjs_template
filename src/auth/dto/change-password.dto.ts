import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";


export class ChangePasswordDto {

    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    oldPassword: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    newPassword: string;
}