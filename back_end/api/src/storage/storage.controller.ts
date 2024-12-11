import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Handles single file upload
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const result = await this.storageService.uploadFile(file);
    return { message: 'File uploaded successfully', result };
  }
  
  


}
