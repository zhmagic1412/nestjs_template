import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";


export class DeleteUserDto {
    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    password: string;
}
