export default class NavItem {
	constructor(
		public url: string,
		public icon: string,
		public label: string,
		public isBrand: boolean = false,
		public subItems: NavItem[] = null
	) {}
}
