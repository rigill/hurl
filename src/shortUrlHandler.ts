import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import {createRepository} from './repository';
import {Response} from './response';
import {createUrl} from './url';

const repo = createRepository();

export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  if (!event.body) return Response.failure();

  const url = createUrl(event.body);

  const hasUrl = await repo.get(url.hash);

  if (!hasUrl) {
    await repo.create(url.hash, url.original);
  }

  return Response.success(url.hash);
}
