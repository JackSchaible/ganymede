import IFormEditable from "../models/core/app/forms/iFormEditable";
import MasterService from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "./http/apiResponse";

export default abstract class FormService<
	T extends IFormEditable
> extends MasterService {
	public abstract save(item: T): Observable<ApiResponse>;
}
