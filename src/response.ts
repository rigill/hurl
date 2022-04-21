export type ResponseType = {
  body: any
  statusCode: number
}

export class Response {
  constructor() {}

  static success(body?: any): Promise<ResponseType> {
    return Promise.resolve({body, statusCode: 200});
  }

  static failure(body?: any): Promise<ResponseType> {
    return Promise.resolve({body, statusCode: 500});
  }

  static missing(body?: any): Promise<ResponseType> {
    return Promise.resolve({body, statusCode: 404});
  }

  static redirect(body?: any): Promise<ResponseType> {
    return Promise.resolve({body, statusCode: 302});
  }
}

