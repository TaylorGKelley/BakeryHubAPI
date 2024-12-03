import HttpStatusCode from '../types/HttpStatusCode';

export class AppError extends Error {
	public statusCode: HttpStatusCode;
	public message: string;
	constructor(statusCode: HttpStatusCode, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
