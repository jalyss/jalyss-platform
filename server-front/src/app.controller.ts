import {
  Param,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

import { unlinkSync } from 'fs';

const multerConfig = {
  dest: 'upload',
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
