import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import path, { join } from 'path';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

// const resolvePath = (file: string) => path.resolve(`../dist/${file}`);

// @Injectable()
// export class FrontendMiddleware implements NestMiddleware {
  // use(req: Request, res: Response, next: NextFunction) {
  //     console.log('back');
  //   const { url } = req;
  //   console.log(req.headers.referer);
  //   console.log(url.indexOf('back-office') );
    

  //   // url.split('/')
  //   if (url.indexOf('back-office') === 1) {
        
  //     // it starts with /api --> continue with execution
  //       res.sendFile(join(__dirname, '../../../back-office', 'build'));
      
  //   // } else if ( ) {
  //   // } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
  //     // it has a file extension --> resolve the file
  //     // res.sendFile(resolvePath(url));
  //     // res.sendFile(join(__dirname, '../../../back-office', 'build'));
  //   } else {
  //     // in all other cases, redirect to the index.html!

  //     next();
  //   }
  // }
// }
