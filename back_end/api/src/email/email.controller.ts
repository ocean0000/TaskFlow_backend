import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from 'src/email/email.service'; 




@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('html') html?: string,
  ): Promise<{ message: string }> {
    await this.emailService.sendMail(to, subject, text, html);
    return { message: 'Email sent successfully!' };
  }
}
