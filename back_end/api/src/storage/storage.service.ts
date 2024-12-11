import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { v2 } from 'cloudinary';

@Injectable()
export class StorageService {
   constructor() {
      v2.config({
        cloud_name: 'dsexbduw6',
        api_key: '997724332565549',
        api_secret: 'K3zB9dbfPAIQuW1JMYoTS0OaryM',
      });
    }

    async uploadFile(file: Express.Multer.File) {
      return new Promise((resolve, reject) => {
        v2.uploader.upload_stream(
          { resource_type: 'auto' }, // Auto detects type of file (image, video, etc.)
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        ).end(file.buffer);
      });
    }




}
