import {Param, Controller, Get, Post, UploadedFile, UseInterceptors,Body,UploadedFiles, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor ,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { MediasService } from './domains/medias/medias.service';
import { unlinkSync } from 'fs';


  const multerConfig = {
    dest: 'upload',
  };

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mediaService: MediasService,
  ) {}  

  @Delete('/work-spaces/delete-images/:name')
  deleteImage(@Param('name') name: string, cb:any) {
    const filePath = `C:/Users/user/Desktop/Nouveau dossier/jalyss-platform/back/upload/${name}`;

    try {
      unlinkSync(filePath);
      return { message: 'File deleted successfully' };
    } catch (error) {
      console.error('Failed to delete the file:', error);
      return { error: 'Failed to delete the file' };
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = multerConfig.dest;
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req: any, file: any, cb: any) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() dto: any) {
    console.log(file);
    let data = {
      description: dto.description,
      alt:dto.alt,
      extension: file.filename.split('.')[1],
      type: file.mimetype,
      path: process.env.API_CONFIG + 'upload/' + file.filename
    }
    return this.mediaService.create(data)
  }

  
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = multerConfig.dest;
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req: any, file: any, cb: any) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadMultiple (@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: any) {
    console.log("filessss",files);
    const mediaData = files.map(file => ({
      description: dto.description,
      alt: dto.alt,
      extension: file.filename.split('.')[1],
      type: file.mimetype,
      path: process.env.API_CONFIG + 'upload/' + file.filename,
    }));
    return this.mediaService.createMany(mediaData);
  }
}

