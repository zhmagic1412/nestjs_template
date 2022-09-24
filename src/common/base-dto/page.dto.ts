import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class PageDto{

  @IsNumber()
  @ApiProperty()
  public page:number;

  @IsNumber()
  @ApiProperty()
  public size:number
}