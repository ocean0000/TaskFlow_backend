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
  async scheduleEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('html') html?: string,
  ): Promise<{ message: string }> {
    const sendDate = new Date(`${date}T${time}:00`);
    const job = new CronJob(sendDate, async () => {
      await this.emailService.sendMail(to, subject, text, html);
      this.schedulerRegistry.deleteCronJob(`${to}-${sendDate}`);
    });

    this.schedulerRegistry.addCronJob(`${to}-${sendDate}`, job);
    job.start();

    return { message: 'Email scheduled successfully!' };
  }

  @Post('update-schedule')
  async updateScheduledEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('newDate') newDate: string,
    @Body('newTime') newTime: string,
    @Body('html') html?: string,
  ): Promise<{ message: string }> {
    const oldSendDate = new Date(`${date}T${time}:00`);
    const newSendDate = new Date(`${newDate}T${newTime}:00`);

    // Remove the old job
    const oldJobKey = `${to}-${oldSendDate}`;
    if (this.schedulerRegistry.doesExist('cron', oldJobKey)) {
      this.schedulerRegistry.deleteCronJob(oldJobKey);
    }

    // Schedule the new job
    const newJob = new CronJob(newSendDate, async () => {
      await this.emailService.sendMail(to, subject, text, html);
      this.schedulerRegistry.deleteCronJob(`${to}-${newSendDate}`);
    });

    this.schedulerRegistry.addCronJob(`${to}-${newSendDate}`, newJob);
    newJob.start();

    return { message: 'Email schedule updated successfully!' };
  }

 
}
