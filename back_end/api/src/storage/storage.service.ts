import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dsexbduw6',
      api_key: '997724332565549',
      api_secret: 'K3zB9dbfPAIQuW1JMYoTS0OaryM',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'video' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result as UploadApiResponse); // Đảm bảo kết quả đúng kiểu
        },
      );

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }
}
