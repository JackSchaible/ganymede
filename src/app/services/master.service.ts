import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

export default abstract class MasterService {
	protected apiUrl: string = environment.apiUrl;
	protected abstract baseUrl: string;

	constructor(protected http: HttpClient) {}
}
