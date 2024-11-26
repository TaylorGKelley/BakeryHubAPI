export type GenericResponse = {
	success: boolean;
	message: string;
};

export type DataResponse<T = any> = GenericResponse & {
	data?: T;
};

export type ErrorResponse = GenericResponse & {
	errorName: string;
	stack: string;
};
