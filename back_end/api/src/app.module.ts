import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { StorageModule } from './storage/storage.module';



const uri= `mongodb://mongo:RqoldZCBioHUKZEaLrtcZhBHeODcjIaj@autorack.proxy.rlwy.net:22866`

@Module({
  imports: [UserModule,
    MongooseModule.forRoot(uri),
    VideoModule,
    StorageModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
