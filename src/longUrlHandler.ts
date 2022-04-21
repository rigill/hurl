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
  const hash = event.body;

  if (!hash) return Response.failure();

  const longUrl = repo.get(hash);

  if (!longUrl) {
    return Response.missing();
  }

  return Response.redirect(longUrl);
}
