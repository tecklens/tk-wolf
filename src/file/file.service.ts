import { Injectable, Logger, StreamableFile } from "@nestjs/common";
import { InjectS3, S3 } from 'nestjs-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3/dist-types/commands/GetObjectCommand';

@Injectable()
export class FileService {
  constructor(@InjectS3() private readonly s3: S3) {}

  public uploadObject = async (file: Express.Multer.File, name) => {
    // Define the params
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'staging/' + String(name),
      Body: file.buffer,
    };
    try {
      const data = await this.s3.send(new PutObjectCommand(params));
      Logger.log(
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key,
      );

      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };

  public downloadObject: (name) => Promise<any> = async (name) => {
    const rsp: GetObjectCommandOutput = await this.s3.getObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'staging/' + String(name),
    });

    return await rsp.Body.transformToByteArray();
  };
}
