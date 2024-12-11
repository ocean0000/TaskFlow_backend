import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';


const uri= `mongodb://mongo:RqoldZCBioHUKZEaLrtcZhBHeODcjIaj@autorack.proxy.rlwy.net:22866`

@Module({
  imports: [UserModule,
    MongooseModule.forRoot(uri),
    VideoModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
