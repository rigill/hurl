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

export function createRepository() {
  return new Respository();
}

