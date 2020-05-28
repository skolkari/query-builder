import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "querybuilder";
  filterIds = [];
  updatedFilters = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('initiated');
    this.addFilter();
  }

  addFilter() {
    console.log('add filter called');
    let randomId = Math.floor(1000 + Math.random() * 9000);
    this.filterIds.push({
      id: randomId
    })
  }

  updateFilter($event) {
    console.log('update event => ', $event);
    if(this.updatedFilters.filter(x => x.queryId === $event.queryId).length === 0) {
      this.updatedFilters.push($event);
    } else {
      this.updatedFilters.find(x => x.queryId === $event.queryId).filterId = $event.filterId
      this.updatedFilters.find(x => x.queryId === $event.queryId).filterValue = $event.filterValue
    }
    console.log('this.updatedFilters ==> ', this.updatedFilters);
    this.updatedFilters = JSON.parse(JSON.stringify(this.updatedFilters));
    this.cdRef.detectChanges();
  }

  deleteFilter($event) {
    this.updatedFilters = this.updatedFilters.filter(x => x.queryId !== $event.queryId)
    this.filterIds = this.filterIds.filter(x => x.id !== $event.queryId);
    if(this.filterIds.length === 0) {
      this.addFilter();
    }
  }

}
