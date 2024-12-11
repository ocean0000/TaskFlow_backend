import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Xử lý file upload
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded'); // Báo lỗi nếu không có file
    }
    const result = await this.storageService.uploadFile(file); // Gọi service để upload file
    return { message: 'File uploaded successfully', url: result.secure_url }; // Trả về URL của file
  }
}
