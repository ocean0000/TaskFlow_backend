import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class StorageService {
  constructor() {
    v2.config({
      cloud_name: 'dsexbduw6',
      api_key: '997724332565549',
      api_secret: 'K3zB9dbfPAIQuW1JMYoTS0OaryM',
      folder :'video',
    });
  }

  // Upload file lên Cloudinary
  async uploadFile(file: Express.Multer.File) {
    try {
      // Upload file trực tiếp từ buffer lên Cloudinary
      const result = await v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
        resource_type: 'auto', // Tự động phát hiện loại file (hình ảnh, video, ...)
      });
      return result; // Trả về kết quả upload (chứa URL)
    } catch (error) {
      throw new Error('Upload to Cloudinary failed: ' + error.message);
    }
  }
}
