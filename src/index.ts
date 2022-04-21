import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import * as md5 from 'md5';
// import {PutObjectCommand} from '@aws-sdk/client-s3';

// repo
// delete
// create
// update
// read
class Respository {
  constructor() { }
  async create(key: string, value: string): Promise<string> {
    return Promise.resolve('create');
  }
  async get(key: string): Promise<string> {
    return Promise.resolve('get');
  }
}

function createRepository() {
  return new Respository();
}

function createUrl(longUrl: string) {
  return md5(longUrl);
}

function success(body?: any) {
  return Promise.resolve({body, statusCode: 200});
}

function failure(body?: any) {
  return Promise.resolve({body, statusCode: 500});
}

const repo = createRepository();

export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  if (!event.body) return failure();

  const longUrl = event.body;
  const shortUrl = createUrl(longUrl);

  if (!repo.get(shortUrl)) {
    await repo.create(shortUrl, longUrl);
  }

  return success({shortUrl});
}
