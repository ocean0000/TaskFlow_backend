import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Handles single file upload
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const result = await this.storageService.uploadFile(file); // Gọi service để upload file lên Cloudinary
    return { message: 'File uploaded successfully', url: result.secure_url }; // Trả về URL file đã upload
  }
}
