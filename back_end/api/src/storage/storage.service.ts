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

  async uploadFile(file: Express.Multer.File, folder: string, rawConvert: string = 'aspose'): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: folder, unique_filename: true, raw_convert: rawConvert },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result as UploadApiResponse);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
