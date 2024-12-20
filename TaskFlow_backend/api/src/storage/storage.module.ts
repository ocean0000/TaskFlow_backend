import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Sử dụng memoryStorage để lưu file trực tiếp vào bộ nhớ
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
