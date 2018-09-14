export default class ApiError {
	public field: string;
	public errorCode: string;

	constructor(field: string, errorCode: string) {
		this.field = field;
		this.errorCode = errorCode;
	}
}
