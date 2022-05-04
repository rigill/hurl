import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import * as streamToString from 'stream-to-string';

class Respository {
  client: S3Client;
  bucket: string;

  constructor() {
    this.client = new S3Client({region: process.env.CDK_DEFAULT_REGION});
    this.bucket = process.env.BUCKET_NAME || '';
  }

  async create(key: string, value: string): Promise<boolean> {
    const command = new PutObjectCommand({
      Key: key,
      Body: value,
      Bucket: this.bucket,
    });

    try {
      const result = await this.client.send(command);
      console.log(result);
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async get(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Key: key,
      Bucket: this.bucket,
    });

    const {Body} = await this.client.send(command);

    return await streamToString(Body);
  }
}

export function createRepository() {
  return new Respository();
}

