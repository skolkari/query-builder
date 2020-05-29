import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

interface Filter {
  filterId: string;
  filterName: string;
}

@Component({
  selector: "query-by",
  templateUrl: "query-by.component.html",
  styleUrls: ["./query-by.component.scss"],
})
export class QueryByComponent implements OnInit {
	@Input() queryId: string;

	@Output() onAdd = new EventEmitter<any>();
	@Output() onUpdate = new EventEmitter<any>();
	@Output() onDelete = new EventEmitter<any>();

  filters: Filter[] = [
    { filterId: "filter1", filterName: "Filter 1" },
    { filterId: "filter2", filterName: "Filter 2" },
    { filterId: "filter3", filterName: "Filter 3" },
	];
	
	selectedFilter: Filter;
	filterValue: string;

	ngOnInit() {}

	filterUpdated() {
		this.onUpdate.emit({
			queryId: this.queryId,
			filterId: this.selectedFilter ? this.selectedFilter.filterId : null,
			filterValue: this.filterValue
		});
	}
	
	addClicked() {
		console.log('clicked');
		this.onAdd.emit();
	}

	deleteClicked() {
		this.onDelete.emit({
			queryId: this.queryId,
			filterId: this.selectedFilter ? this.selectedFilter.filterId : null,
			filterValue: this.filterValue
		});
	}
}
