type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export class GenericError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;

	constructor(name: string, message: string, statusCode: HttpCode = 500) {
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.statusCode = statusCode;

		Error.captureStackTrace(this);
	}
}
