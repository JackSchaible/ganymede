import {
	OnInit,
	OnDestroy,
	QueryList,
	ViewChildren,
	AfterViewInit
} from "@angular/core";
import KeyboardBaseComponent from "./keyboardBaseComponents";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Key } from "ts-key-enum";
import { IAppState } from "src/app/models/core/iAppState";
import { NgRedux } from "@angular-redux/store";
import { Router } from "@angular/router";
import IListActions from "src/app/store/iListActions";
import IListable from "src/app/models/core/app/forms/iListable";
import { Location } from "@angular/common";
import { MatExpansionPanel } from "@angular/material/expansion";
import { startWith, debounceTime, mergeAll } from "rxjs/operators";
import { scheduled, asapScheduler } from "rxjs";
import { ModalModel } from "../models/modalModel";
import { MatDialog } from "@angular/material/dialog";
import FormService from "src/app/services/form.service";
import SnackbarModel from "../models/snackbarModel";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalComponent } from "../modal/modal.component";
import { ApiResponse } from "src/app/services/http/apiResponse";

export abstract class ListBaseComponent<
	T extends IListable,
	U extends IListActions<T>,
	V extends FormService<T>
> extends KeyboardBaseComponent implements OnInit, AfterViewInit, OnDestroy {
	public processing: boolean;

	@ViewChildren(MatExpansionPanel)
	private matExpansionPanels: QueryList<any>;
	private accordionItems: MatExpansionPanel[];
	protected selectedItem: number;

	private hasOpened: boolean;

	constructor(
		protected store: NgRedux<IAppState>,
		protected router: Router,
		protected actions: U,
		protected campaignService: V,
		private location: Location,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		keyboardService: KeyboardService
	) {
		super(keyboardService);
	}

	protected abstract constructEditUrl(itemId: number): string;
	protected abstract getItem(): T;

	public ngOnInit() {
		super.ngOnInit();

		this.selectedItem = 0;

		this.keySubscriptions.push(
			{
				key: "n",
				modifierKeys: [Key.Alt],
				callbackFn: () => this.edit(-1)
			},
			{
				key: Key.Backspace,
				modifierKeys: [Key.Alt],
				callbackFn: () => this.location.back()
			},
			{
				key: Key.ArrowUp,
				modifierKeys: [],
				callbackFn: () => {
					if (this.selectedItem <= 0) return;

					this.getExpansionPanelById().close();
					this.selectedItem--;
					this.getExpansionPanelById().open();
				}
			},
			{
				key: Key.ArrowDown,
				modifierKeys: [],
				callbackFn: () => {
					if (this.selectedItem > this.accordionItems.length) return;

					this.getExpansionPanelById().close();

					if (this.hasOpened) this.selectedItem++;
					else this.hasOpened = true;

					this.getExpansionPanelById().open();
				}
			},
			{
				key: "e",
				modifierKeys: [Key.Alt],
				callbackFn: () => this.edit(this.getItem().id)
			},
			{
				key: Key.Delete,
				modifierKeys: [],
				callbackFn: () => this.delete(this.getItem())
			}
		);
	}

	public ngAfterViewInit() {
		const events = [];

		this.matExpansionPanels.changes
			.pipe(startWith(this.matExpansionPanels))
			.subscribe((r: QueryList<MatExpansionPanel>) => {
				this.accordionItems = [];
				let i = 0;
				r.forEach((item: MatExpansionPanel) => {
					this.accordionItems.push(item);
					events.push(item.afterExpand);
					i++;
				});
			});

		scheduled(events, asapScheduler)
			.pipe(
				mergeAll(),
				debounceTime(500)
			)
			.subscribe(() => {
				const els = document.getElementsByTagName(
					"mat-expansion-panel"
				);
				els[this.selectedItem].scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest"
				});
			});
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	public edit(itemId: number): void {
		this.store.dispatch(this.actions.edit(itemId));
		this.router.navigateByUrl(this.constructEditUrl(itemId));
	}

	public delete(item: T): void {
		const model: ModalModel = {
			title: "Confirm Delete",
			content: `<p>Are you sure you wish to delete ${item.name}?`,
			closeButton: {
				icon: null,
				color: "primary",
				titleText: "Close",
				keyCommand: {
					model: {
						icon: undefined,
						key: "ESC"
					},
					subscription: {
						key: Key.Escape,
						modifierKeys: [],
						callbackFn: () => {}
					}
				}
			},
			buttons: [
				{
					icon: "trash-alt",
					color: "warn",
					titleText: "Delete",
					keyCommand: {
						model: {
							icon: undefined,
							key: "ENTER"
						},
						subscription: {
							key: Key.Enter,
							modifierKeys: [],
							callbackFn: () => {
								this.confirmDelete(item);
							}
						}
					}
				}
			]
		};

		this.dialog.open(ModalComponent, {
			data: model
		});
	}

	private confirmDelete(item: T): void {
		this.processing = true;
		this.campaignService.delete(item.id).subscribe(
			(response: ApiResponse) => {
				if (response.statusCode === "ok") {
					this.store.dispatch(this.actions.delete(item.id));
					this.processing = false;
				} else this.deleteError(item);
			},
			() => this.deleteError(item)
		);
	}

	private deleteError(item: T) {
		this.processing = false;
		this.openSnackbar(
			"exclamation-triangle",
			`An error occurred while deleting ${item.name}!`
		);
	}

	private getExpansionPanelById(): MatExpansionPanel {
		return this.accordionItems.find(
			(_item: MatExpansionPanel, index: number) =>
				index === this.selectedItem
		);
	}

	protected openSnackbar(icon: string, message: string): void {
		let textClass = "text-info";

		switch (icon) {
			case "check-square":
				textClass = "text-success";
				break;

			case "exclamation-triangle":
				textClass = "text-danger";
				break;
		}

		const options: SnackbarModel = {
			icon: icon,
			message: message,
			textClass: textClass
		};

		this.snackBar.openFromComponent(SnackbarComponent, {
			data: options,
			duration: 5000
		});
	}
}
