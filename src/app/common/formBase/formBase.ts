import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import {
	FormGroup,
	FormControl,
	FormArray,
	AbstractControl
} from "@angular/forms";
import { IAppState } from "src/app/models/core/iAppState";
import { NgRedux } from "@angular-redux/store";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ApiResponse } from "src/app/services/http/apiResponse";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";
import IFormActions from "src/app/store/iFormActions";
import FormService from "src/app/services/form.service";
import { SnackBarService } from "src/app/services/snackbar.service";

export default abstract class FormBase<
	T extends IFormEditable,
	U extends IFormActions<T>
> {
	constructor(
		protected store: NgRedux<IAppState>,
		protected actions: U,
		protected location: Location,
		protected service: FormService<T>,
		protected snackBarService: SnackBarService
	) {}

	private formStoreSubscription: Subscription;
	private formValueChangesSubscription: Subscription;

	public abstract formGroup: FormGroup;
	protected abstract formSelector: Array<string>;

	public processing: boolean;
	public isNew: boolean;
	public formGroupErrors: any = {};

	protected abstract fixWeirdities(item: T): T;
	protected abstract isEqual(a: T, b: T): boolean;
	protected abstract syncFrom(item: T): void;
	protected abstract syncTo(item: T): void;
	protected abstract getInstance(): T;
	protected abstract afterNew(item: T): T;

	protected onInit() {
		this.syncFromStore();
		this.syncToStore();

		this.isNew = this.getInstance().id === -1;
	}

	protected onDestroy() {
		if (this.formStoreSubscription)
			this.formStoreSubscription.unsubscribe();

		if (this.formStoreSubscription)
			this.formValueChangesSubscription.unsubscribe();
	}

	public cancel(): void {
		this.actions.change(null);
		this.location.back();
	}

	public save(): void {
		this.validateAllFormFields(this.formGroup);
		this.validateFormGroup();

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

					this.store.dispatch(this.actions.save(item, this.isNew));

					this.snackBarService.showSuccess(
						response,
						item.name,
						item,
						this.isNew,
						this.actions.save
					);
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

				this.validateFormGroup();
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

	private validateFormGroup() {
		this.formGroupErrors = {};
		Object.keys(this.formGroup.controls).forEach((field: string) => {
			this.setGroupError(this.formGroup.get(field), field);
		});
	}

	private setGroupError(control: AbstractControl, field: string) {
		if (!this.isValid(control)) this.formGroupErrors[field] = true;
	}

	private isValid(control: AbstractControl): boolean {
		let valid = true;

		if (control instanceof FormGroup)
			valid = this.isFormGroupValid(control);
		else if (control instanceof FormArray)
			valid = this.isArrayValid(control);
		else if (control instanceof FormControl)
			valid = this.isControlValid(control);

		return valid;
	}

	private isFormGroupValid(group: FormGroup): boolean {
		let valid = true;

		Object.keys(group.controls).forEach((key: string) => {
			const control = group.get(key);
			valid = this.isValid(control);
		});

		return valid;
	}

	private isArrayValid(array: FormArray): boolean {
		let isValid = true;

		array.controls.forEach((value: AbstractControl) => {
			isValid = this.isValid(value);
		});

		return isValid;
	}

	private isControlValid(control: FormControl): boolean {
		if (control.valid) return true;
		return control.touched || control.dirty;
	}
}
