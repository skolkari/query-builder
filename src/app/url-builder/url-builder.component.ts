import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "url-builder",
  templateUrl: "url-builder.component.html",
  styleUrls: ["./url-builder.component.scss"],
})
export class UrlBuilderComponent implements OnInit, OnChanges {
  @Input() selectedFilters: any[];

  methods: any[] = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
  ];
  selectedMethod: string = "GET";
  formattedUrl: string = "http://localhost:4200/testapi";

  ngOnInit() {}

  ngOnChanges() {
    console.log("selectedFilters ==> ", this.selectedFilters);
		this.formattedUrl = "http://localhost:4200/testapi";
    this.selectedFilters.forEach((filter, index) => {
      this.formattedUrl =
        this.formattedUrl + (index === 0 ? "?" : "&") + filter.filterId + "=";
      if (filter.filterValue != null && filter.filterValue != undefined) {
        this.formattedUrl = this.formattedUrl + filter.filterValue;
      }
    });
  }
}
