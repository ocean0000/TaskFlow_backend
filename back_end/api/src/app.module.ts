import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';

@Module({
  imports: [UserModule,
    MongooseModule.forRoot('mongodb-production-c3b1.up.railway.app'),
    VideoModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
