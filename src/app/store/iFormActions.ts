import { AnyAction } from "redux";

export default interface IFormActions<IFormEditable> {
	edit: (id: number) => AnyAction;
	change: (item: IFormEditable) => AnyAction;
	save: (item: IFormEditable, isNew: boolean) => AnyAction;
	delete: (id: number) => AnyAction;
}
