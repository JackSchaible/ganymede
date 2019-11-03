import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { IAppState } from "src/app/models/core/iAppState";
import { NgRedux } from "@angular-redux/store";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ApiResponse } from "src/app/services/http/apiResponse";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";
import IFormActions from "src/app/store/iFormActions";
import FormService from "src/app/services/form.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { Key } from "ts-key-enum";
import {
	KeyboardService,
	KeyboardSubscription
} from "src/app/services/keyboard.service";

export default abstract class FormBase<
	T extends IFormEditable,
	U extends IFormActions<T>
> {
	constructor(
		protected store: NgRedux<IAppState>,
		protected actions: U,
		protected location: Location,
		protected service: FormService<T>,
		protected snackBarService: SnackBarService,
		private keyboardService: KeyboardService
	) {}

	protected keySubscriptions: KeyboardSubscription[];

	private formStoreSubscription: Subscription;
	private formValueChangesSubscription: Subscription;
	private keyboardSubscription: Subscription;

	public abstract formGroup: FormGroup;
	protected abstract formSelector: Array<string>;

	public processing: boolean;
	public isNew: boolean;

	protected abstract fixWeirdities(item: T): T;
	protected abstract isEqual(a: T, b: T): boolean;
	protected abstract syncFrom(item: T): void;
	protected abstract syncTo(item: T): void;
	protected abstract getInstance(): T;
	protected abstract afterNew(item: T): T;
	protected abstract getParentId(): number;

	protected onInit() {
		window.scrollTo({ top: 0 });
		this.syncFromStore();
		this.syncToStore();

		this.isNew = this.getInstance().id === -1;

		this.keySubscriptions = [];
		this.keyboardSubscription = this.keyboardService
			.keydown()
			.subscribe((event: KeyboardEvent) => this.keyPressed(event));

		this.keySubscriptions.push(
			{
				key: "s",
				modifierKeys: [Key.Control],
				callbackFn: () => this.save()
			},
			{
				key: Key.Backspace,
				modifierKeys: [Key.Alt],
				callbackFn: () => this.cancel()
			}
		);
	}

	protected onDestroy() {
		if (this.formStoreSubscription)
			this.formStoreSubscription.unsubscribe();

		if (this.formStoreSubscription)
			this.formValueChangesSubscription.unsubscribe();

		if (this.keyboardSubscription) this.keyboardSubscription.unsubscribe();
	}

	public cancel(): void {
		this.actions.change(null);
		this.location.back();
	}

	public save(): void {
		this.validateAllFormFields(this.formGroup);

		if (this.formGroup.valid) {
			this.processing = true;
			let item = this.getInstance();

			if (this.isNew) {
				item.id = -1;
				item = this.afterNew(item);
			}

			this.processing = true;

			this.service.save(item).subscribe(
				(response: ApiResponse) => {
					this.processing = false;

					if (response.statusCode === "error")
						this.snackBarService.showError(item.name);
					else {
						this.store.dispatch(
							this.actions.save(
								item,
								this.getParentId(),
								this.isNew
							)
						);

						this.snackBarService.showSuccess(
							response,
							item.name,
							item,
							this.isNew,
							this.actions.save
						);
					}
				},
				() => {
					this.processing = false;
					this.snackBarService.showError(item.name);
				}
			);
		}
	}

	private syncFromStore() {
		if (this.formStoreSubscription !== undefined) return;

		this.formStoreSubscription = this.store
			.select(this.formSelector)
			.subscribe((item: T) => {
				this.formGroup.patchValue(item);
				this.syncFrom(item);
			});
	}

	private syncToStore() {
		if (this.formValueChangesSubscription !== undefined) return;

		this.formValueChangesSubscription = this.formGroup.valueChanges
			.pipe(
				debounceTime(250),
				distinctUntilChanged((a: T, b: T): boolean => {
					a = this.fixWeirdities(a);
					b = this.fixWeirdities(b);
					return this.isEqual(a, b);
				})
			)
			.subscribe((item: T) => {
				item = this.fixWeirdities(item);
				this.store.dispatch(this.actions.change(item));
				this.syncTo(item);
			});
	}

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach((field: string) => {
			const control = formGroup.get(field);
			if (control instanceof FormControl)
				control.markAsTouched({ onlySelf: true });
			else if (control instanceof FormGroup)
				this.validateAllFormFields(control);
		});
	}

	private keyPressed(event: KeyboardEvent) {
		let combinationFound = false;

		this.keySubscriptions.forEach((subscription: KeyboardSubscription) => {
			let modifiers = true;

			if (subscription.modifierKeys) {
				subscription.modifierKeys.forEach((key: Key) => {
					switch (key) {
						case Key.Alt:
							if (!event.altKey) modifiers = false;
							break;

						case Key.Control:
							if (!event.ctrlKey) modifiers = false;
							break;

						case Key.Shift:
							if (!event.shiftKey) modifiers = false;
							break;

						default:
							throw new Error(
								`Modifier key '${key}' is not supported.`
							);
					}
				});
			}

			if (modifiers)
				if (event.key === subscription.key) {
					subscription.callbackFn();
					combinationFound = true;
				}
		});

		if (combinationFound) event.preventDefault();
	}
}
