import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
   
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      MailerModule.forRoot({
        transport:{
          service:'Gmail',
          auth:{
            user:'testmarouani1@gmail.com',
            pass:'ijnjmqpvxdxuljuh'
          }
        } ,
        defaults: {
          from: 'testmarouani1@gmail.com',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}