import { ProtectedUser } from '../../domain/entities/User';

export type GenericResponse = {
	success: boolean;
	message: string;
};

export type DataResponse<T = any> = GenericResponse & {
	data?: T;
};

export type ErrorResponse = GenericResponse & {
	errorName: string;
	stack?: string;
};

export type UserResponse = GenericResponse & {
	user: ProtectedUser;
};
