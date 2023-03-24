import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';




@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

     mail(): void {
        this.mailerService
            .sendMail({
                to: 'wassimmarweni.sfax@gmail.com', 
                from: 'wassimmarweni.sfax@gmail.com', 
                subject: 'Test Mailer ✔',
                text: 'welcome', 
                html: '<b>welcome</b>',
            })
            .then(() => { })
            .catch((z) => {console.log(z);
             });
    }




}