import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

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

  @Post('schedule')
  async scheduleOrUpdateEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('newDate') newDate?: string,
    @Body('newTime') newTime?: string,
    @Body('html') html?: string,
  ): Promise<{ message: string }> {
    const oldSendDate = new Date(`${date}T${time}:00`);
    const sendDate = newDate && newTime ? new Date(`${newDate}T${newTime}:00`) : oldSendDate;
    const jobKey = `${to}-${sendDate}`;

    // Remove the old job if it exists
    if (this.schedulerRegistry.doesExist('cron', jobKey)) {
      this.schedulerRegistry.deleteCronJob(jobKey);
    }

    // Schedule the new job
    const job = new CronJob(sendDate, async () => {
      await this.emailService.sendMail(to, subject, text, html);
      this.schedulerRegistry.deleteCronJob(jobKey);
    });

    this.schedulerRegistry.addCronJob(jobKey, job);
    job.start();

    return { message: newDate && newTime ? 'Email schedule updated successfully!' : 'Email scheduled successfully!' };
  }

 
}
