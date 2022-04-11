import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import {S3} from 'aws-sdk';

export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  const msg = 'hello world';
  console.log(msg);
  return Promise.resolve({body: msg, statusCode: 200});
}
