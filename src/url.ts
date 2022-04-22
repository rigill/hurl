import * as md5 from 'md5';

class Url {
  hash: string;
  original: string;

  constructor(body: any) {
    this.original = this.validate(body);
    this.hash = md5(body);
  }

  validate(body: any): string {
    return body.toString();
  }
}

export function createUrl(body: any) {
  return new Url(body);
}
