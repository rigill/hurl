export type StatusCode = {
  statusCode: number
}

export type Headers = {
  headers: {
      Location: string
  }
}

export type Body = {
  body: any
}

export class Response {
  constructor() {}

  static success(body?: any): Promise<StatusCode & Body> {
    return Promise.resolve({body, statusCode: 200});
  }

  static failure(body?: any): Promise<StatusCode & Body> {
    return Promise.resolve({body, statusCode: 500});
  }

  static missing(): Promise<StatusCode> {
    return Promise.resolve({statusCode: 404});
  }

  static redirect(location: string): Promise<Headers & StatusCode> {
    return Promise.resolve({headers: {Location: location}, statusCode: 302});
  }
}
