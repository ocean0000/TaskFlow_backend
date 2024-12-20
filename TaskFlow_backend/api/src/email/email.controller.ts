import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
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
    @Body('html') html?: string,
  ): Promise<{ message: string }> {
    const sendDate = new Date(`${date}T${time}:00Z`); // Ensure the date is in UTC
    const jobKey = `${to}-${sendDate.toISOString()}`;

    this.logger.log(`Scheduling email to ${to} at ${sendDate.toISOString()}`);

    // Remove the old job if it exists
    if (this.schedulerRegistry.doesExist('cron', jobKey)) {
      this.schedulerRegistry.deleteCronJob(jobKey);
      this.logger.log(`Deleted existing job with key ${jobKey}`);
    }

    // Check if the send date is in the past
    if (sendDate <= new Date()) {
      this.logger.warn(`WARNING: Date in past. Will never be fired.`);
      return { message: 'WARNING: Date in past. Will never be fired.' };
    }

    // Schedule the new job
    const job = new CronJob(sendDate, async () => {
      this.logger.log(`Executing job for ${to} at ${sendDate.toISOString()}`);
      await this.emailService.sendMail(to, subject, text, html);
      this.schedulerRegistry.deleteCronJob(jobKey);
      this.logger.log(`Email sent to ${to} and job ${jobKey} deleted`);
    });

    this.schedulerRegistry.addCronJob(jobKey, job);
    job.start();
    this.logger.log(`Scheduled new job with key ${jobKey}`);

    return { message: 'Email scheduled successfully!' };
  }

  @Get('scheduled-jobs')
  listScheduledJobs(): { jobs: string[] } {
    const jobs = this.schedulerRegistry.getCronJobs();
    const jobNames = [];
    jobs.forEach((value, key) => jobNames.push(key));
    return { jobs: jobNames };
  }

  @Post('cancel')
  async cancelScheduledEmail(
    @Body('to') to: string,
    @Body('date') date: string,
    @Body('time') time: string,
  ): Promise<{ message: string }> {
    const sendDate = new Date(`${date}T${time}:00Z`); // Ensure the date is in UTC
    const jobKey = `${to}-${sendDate.toISOString()}`;

    this.logger.log(`Cancelling scheduled email to ${to} at ${sendDate.toISOString()}`);

    // Check if the job exists
    if (this.schedulerRegistry.doesExist('cron', jobKey)) {
      this.schedulerRegistry.deleteCronJob(jobKey);
      this.logger.log(`Deleted job with key ${jobKey}`);
      return { message: 'Scheduled email cancelled successfully' };
    } else {
      this.logger.warn(`No job found with key ${jobKey}`);
      return { message: 'No scheduled email found to cancel' };
    }
  }

 
}
