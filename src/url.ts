import {Md5} from 'ts-md5/dist/md5';

class Url {
  hash: string;
  original: string;

  constructor(body: any) {
    this.original = this.validate(body);
    this.hash = Md5.hashStr(body);
  }

  validate(body: any): string {
    return body.toString();
  }
}

export function createUrl(body: any) {
  return new Url(body);
}
