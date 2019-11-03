import { AnyAction } from "redux";

export default interface IFormActions<IFormEditable> {
	edit: (id: number) => AnyAction;
	change: (item: IFormEditable) => AnyAction;
	save: (item: IFormEditable, parentId: number, isNew: boolean) => AnyAction;
	delete: (id: number, parentId?: number) => AnyAction;
}
