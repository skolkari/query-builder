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
    { filterId: "ProviderID", filterName: "Provider ID" },
    { filterId: "Title", filterName: "Title" },
    { filterId: "ContentType", filterName: "Content Type" },
    { filterId: "MPXMediaID", filterName: "Media GUID" },
    { filterId: "WWEnabled", filterName: "Slice/WW Enabled" },
    { filterId: "Status", filterName: "Status" },
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
