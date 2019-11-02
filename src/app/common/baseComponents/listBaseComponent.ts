import {
	Component,
	OnInit,
	OnDestroy,
	QueryList,
	ViewChildren,
	AfterViewInit,
	ElementRef
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
import { startWith, debounceTime, map, mergeAll } from "rxjs/operators";
import { combineLatest, Subject, scheduled, asapScheduler } from "rxjs";

@Component({})
export abstract class ListBaseComponent<
	T extends IListable,
	U extends IListActions<T>
> extends KeyboardBaseComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(MatExpansionPanel)
	private matExpansionPanels: QueryList<any>;
	private accordionItems: MatExpansionPanel[];

	private openedEvents$ = new Subject();

	private selectedItem: number;
	private hasOpened: boolean;

	constructor(
		protected store: NgRedux<IAppState>,
		private router: Router,
		private actions: U,
		private location: Location,
		keyboardService: KeyboardService
	) {
		super(keyboardService);
	}

	protected abstract constructUrl(itemId: number): string;

	public ngOnInit() {
		super.ngOnInit();

		this.selectedItem = 0;

		this.keySubscriptions.push(
			{
				key: "n",
				modifierKeys: [Key.Control],
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

					this.getExpansionPanelById(this.selectedItem).close();
					this.selectedItem--;
					this.getExpansionPanelById(this.selectedItem).open();
				}
			},
			{
				key: Key.ArrowDown,
				modifierKeys: [],
				callbackFn: () => {
					if (this.selectedItem > this.accordionItems.length) return;

					this.getExpansionPanelById(this.selectedItem).close();

					if (this.hasOpened) this.selectedItem++;
					else this.hasOpened = true;

					this.getExpansionPanelById(this.selectedItem).open();
				}
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
		this.router.navigateByUrl(this.constructUrl(itemId));
	}

	private getExpansionPanelById(id: number): MatExpansionPanel {
		return this.accordionItems.find(
			(item: MatExpansionPanel, index: number) =>
				index === this.selectedItem
		);
	}
}
