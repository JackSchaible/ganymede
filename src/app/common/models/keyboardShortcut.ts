import { KeyboardSubscription } from "src/app/services/keyboard.service";
import KeyCommandModel from "./keyCommandModel";

export default class KeyboardShortcut {
	public subscription: KeyboardSubscription;
	public model: KeyCommandModel;
}
