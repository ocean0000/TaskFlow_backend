import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { StorageModule } from './storage/storage.module';

import { ProjectModule } from './project/project.module';



const uri= `mongodb+srv://ulock:ulock1234@ulock.jcmbi.mongodb.net/?retryWrites=true&w=majority&appName=ulock`

@Module({
  imports: [UserModule,
    MongooseModule.forRoot(uri),
    VideoModule,
    StorageModule,
   
    ProjectModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
