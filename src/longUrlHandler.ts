import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import {createRepository} from './repository';
import {Response} from './response';

const repo = createRepository();

export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  const hash = event.pathParameters?.url || '';
  console.log('event', JSON.stringify(event));

  console.log('hash', hash);

  if (!hash) return Response.failure();

  const longUrl = await repo.get(hash);

  console.log('longUrl', longUrl);

  if (!longUrl) {
    return Response.missing('Long url not found');
  }

  return Response.redirect(longUrl);
}
