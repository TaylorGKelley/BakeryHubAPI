import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../domain/entities/User';
import db from '../../../infrastructure/database/drizzle';
import { eq } from 'drizzle-orm';
import { usersTable } from '../../../infrastructure/database/drizzle/schema/users.schema';
import { AppError } from '../../../shared/errors/appError';

export type RefreshTokenData = {
	userId: number;
	refreshTokenVersion: number;
};

export type AccessTokenData = {
	userId: number;
};

const cookieSettings = {
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 30 * 24 * 60 * 60 * 1000,
} as const;

const validateTokenSecrets = () => {
	if (
		!process.env.ACCESS_TOKEN_SECRET ||
		process.env.ACCESS_TOKEN_SECRET.length < 32
	) {
		throw new Error('Invalid ACCESS_TOKEN_SECRET');
	}
	if (
		!process.env.REFRESH_TOKEN_SECRET ||
		process.env.REFRESH_TOKEN_SECRET.length < 32
	) {
		throw new Error('Invalid REFRESH_TOKEN_SECRET');
	}
};

const createAuthTokens = (
	user: User
): { refreshToken: string; accessToken: string } => {
	validateTokenSecrets();

	const now = Math.floor(Date.now() / 1000);

	const refreshToken = jwt.sign(
		{
			userId: user.id,
			refreshTokenVersion: user.refreshTokenVersion,
			iat: now,
		} as RefreshTokenData,
		process.env.REFRESH_TOKEN_SECRET!,
		{ expiresIn: '30d' }
	);

	const accessToken = jwt.sign(
		{
			userId: user.id,
			iat: now,
		} as AccessTokenData,
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: '15m' }
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
		throw new AppError(401, 'Refresh token is required');
	}

	// Verify refresh token
	let data;
	try {
		data = <RefreshTokenData>(
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
		);
	} catch {
		throw new AppError(401, 'Invalid refresh token');
	}

	// Get user
	const user = (
		await db.select().from(usersTable).where(eq(usersTable.id, data.userId))
	).at(0);

	// Check refresh token version
	if (!user || user.refreshTokenVersion !== data.refreshTokenVersion) {
		throw new AppError(401, 'Invalid refresh token');
	}

	return {
		userId: data.userId,
		user,
	};
};
