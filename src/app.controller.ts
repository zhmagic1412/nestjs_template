import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { join } from "path";
import {readDirSync, uploadStaticFile} from "./common/utils/file-utils";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileDto} from "./common/base-dto/file.dto";
import {ApiConsumes} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get("file/getFileList")
  getFileList() {
    const res = [];
    const root = join(__dirname, '..')
    readDirSync(0,0,root,'static',res)
    return res;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post("file/uploadFile")
  @ApiConsumes('multipart/form-data')
  uploadFile(@UploadedFile() file: any,
             @Body() fileDto: FileDto){
    const path = uploadStaticFile(file);
    return path
  }
}
