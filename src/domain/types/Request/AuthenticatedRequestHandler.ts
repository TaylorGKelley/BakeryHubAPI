import { RequestHandler } from 'express';
import { User } from '../../entities/User';

export type AuthenticatedRequestHandler<
	T extends RequestHandler = RequestHandler
> = (
	req: Parameters<T>[0] & { user: User },
	res: Parameters<T>[1],
	next: Parameters<T>[2]
) => ReturnType<T>;
