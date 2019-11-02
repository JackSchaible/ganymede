import IListable from "../models/core/app/forms/iListable";
import { AnyAction } from "redux";

export default interface IListActions<T extends IListable> {
	edit: (id: number) => AnyAction;
}
