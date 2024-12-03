import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../domain/entities/User';
import db from '../../../infrastructure/database/drizzle';
import { eq } from 'drizzle-orm';
import usersTable from '../../../infrastructure/database/drizzle/schema/users.schema';
import { AppError } from '../../../shared/errors/appError';

export type RefreshTokenData = {
	userId: string;
	refreshTokenVersion?: number;
};

export type AccessTokenData = {
	userId: string;
};

const cookieSettings = {
	httpOnly: true,
	sameSite: 'lax',
} as const;

const createAuthTokens = (
	user: User
): { refreshToken: string; accessToken: string } => {
	const refreshToken = jwt.sign(
		{ userId: user.id, refreshTokenVersion: user.refreshTokenVersion },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: '30d',
		}
	);

	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN_SECRET!,
		{
			expiresIn: '15min',
		}
	);

	return { refreshToken, accessToken };
};

export const createSession = (res: Response, user: User) => {
	const { accessToken, refreshToken } = createAuthTokens(user);
	res.cookie('id', accessToken, cookieSettings);
	res.cookie('rid', refreshToken, cookieSettings);
	return;
};

export const clearAuthCookies = (res: Response) => {
	res.clearCookie('id', cookieSettings);
	res.clearCookie('rid', cookieSettings);
};

export const checkTokens = async (
	accessToken: string,
	refreshToken: string
) => {
	try {
		// verify
		const data = <AccessTokenData>(
			jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
		);

		// get userId from token data
		return {
			userId: data.userId,
		};
	} catch {
		// token is expired or signed with a different secret
		// so now check refresh token
	}

	if (!refreshToken) {
		throw new AppError(401, 'Unauthorized');
	}

	// Verify refresh token
	let data;
	try {
		data = <RefreshTokenData>(
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
		);
	} catch {
		throw new AppError(401, 'Unauthorized');
	}

	// Get user
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, data.userId),
	});

	// Check refresh token version
	if (!user || user.refreshTokenVersion !== data.refreshTokenVersion) {
		throw new AppError(401, 'Unauthorized');
	}

	return {
		userId: data.userId,
		user,
	};
};
