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
import { MediasService } from './medias/medias.service';

const multerConfig = {
  dest: 'upload',
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mediaService: MediasService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
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
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          const originalExtension = extname(file.originalname); // Get original extension
          const detectedExtension =
            originalExtension || `.${file.mimetype.split('/')[1]}` || '.dat'; // Try to detect extension from mimetype

          cb(null, `${randomName}${detectedExtension}`);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Body() dto: any) {
    const originalExtension = extname(file.originalname); // Get original extension
    const detectedExtension =
      originalExtension || `.${file.mimetype.split('/')[1]}` || '.dat'; // Try to detect extension from mimetype

    const filenameWithExtension = file.filename.includes('.')
      ? file.filename
      : `${file.filename}${detectedExtension}`;

    let data = {
      description: dto.description,
      alt: dto.alt,
      extension: detectedExtension.substring(1), // Remove the leading dot from the extension
      type: file.mimetype,
      path:
        process.env.SERVER_UPLOAD_CONFIG + 'upload/' + filenameWithExtension,
    };

    return this.mediaService.create(data);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
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
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          const originalExtension = extname(file.originalname); // Get original extension
          const detectedExtension =
            originalExtension || `.${file.mimetype.split('/')[1]}` || '.dat'; // Try to detect extension from mimetype

          cb(null, `${randomName}${detectedExtension}`);
        },
      }),
    }),
  )
  async uploadMultiple(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: any,
  ) {
    const mediaData = files.map((file) => {
      const originalExtension = extname(file.originalname); // Get original extension
      const detectedExtension =
        originalExtension || `.${file.mimetype.split('/')[1]}` || '.dat'; // Try to detect extension from mimetype

      const filenameWithExtension = file.filename.includes('.')
        ? file.filename
        : `${file.filename}${detectedExtension}`;

      let data = {
        description: dto.description,
        alt: dto.alt,
        extension: detectedExtension.substring(1), // Remove the leading dot from the extension
        type: file.mimetype,
        path:
          process.env.SERVER_UPLOAD_CONFIG + 'upload/' + filenameWithExtension,
      };
      return data;
    });
    return this.mediaService.createMany(mediaData);
  }

  @Post('upload-image-ugte')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = multerConfig.dest + '/ugte-images';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname) || '.jpg'}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: any,
  ) {
    const extension = extname(file.originalname) || '.jpg'; // Extract extension or default to '.jpg'
    const filenameWithExtension = file.filename.includes('.')
      ? file.filename
      : `${file.filename}${extension}`;

    let data = {
      description: dto.description,
      alt: dto.alt,
      extension: extension.substring(1), // Remove the leading dot from the extension
      type: file.mimetype,
      url:
        process.env.SERVER_UPLOAD_CONFIG +
        'upload/ugte-images/' +
        filenameWithExtension,
    };
    return data;
  }
}
