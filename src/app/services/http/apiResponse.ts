import ApiError from "./apiError";

export class ApiResponse {
	public statusCode: string;
	public apiErrors: ApiError[];
	public insertedID: number;
}
