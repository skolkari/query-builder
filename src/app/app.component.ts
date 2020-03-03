import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'data-table';

  rows: any[] = [];
  selectedColumns: any[] = [];
  scrollableColumns: any[] = [];
  fixedColumns: any[] = [];
  paginationType = 'pagination';
  dataFetchInProgess = true;
  rowName = '';
  showSaveRowSuccess = false;
  columns = [
    {
      name: 'Name',
      field: 'name',
      selected: true
    },
    {
      name: 'Phone',
      field: 'phone',
      selected: true
    },
    {
      name: 'Email',
      field: 'email',
      selected: true
    },
    {
      name: 'Company',
      field: 'company',
      selected: true
    },
    {
      name: 'Date of Entry',
      field: 'date_entry',
      selected: false
    },
    {
      name: 'Org Num',
      field: 'org_num',
      selected: false
    },
    {
      name: 'Address',
      field: 'address_1',
      selected: false
    },
    {
      name: 'City',
      field: 'city',
      selected: false
    },
    {
      name: 'Zip',
      field: 'zip',
      selected: false
    },
    {
      name: 'Pan',
      field: 'pan',
      selected: false
    },
    {
      name: 'Pin',
      field: 'pin',
      selected: false
    },
    {
      name: 'Fee',
      field: 'fee',
      selected: false
    },
    {
      name: 'Date of Exit',
      field: 'date_exit',
      selected: false
    },
    {
      name: 'Date of First',
      field: 'date_first',
      selected: false
    },
    {
      name: 'Date of Recent',
      field: 'date_recent',
      selected: false
    },
    {
      name: 'Submit',
      field: 'submit',
      fixed: true,
      callback: ($event) => { this.saveRow($event); }
    }
  ];

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.findSelectedColumns();
    this.appService.getTableData().subscribe((response: any) => {
      console.log('response => ', response);
      if (response && response.data) {
        this.rows = response.data;
        this.dataFetchInProgess = false;
      }
    }, error => {
      this.dataFetchInProgess = false;
    });
  }

  toggleRows() {
    this.dataFetchInProgess = true;
    if (this.paginationType != 'norows') {
      this.appService.getTableData().subscribe((response: any) => {
        console.log('response => ', response);
        if (response && response.data) {
          this.rows = response.data;
          this.dataFetchInProgess = false;
        }
      }, error => {
        this.dataFetchInProgess = false;
      });
    } else {
      this.rows = [];
      this.dataFetchInProgess = false;
    }
  }

  saveRow(rowData) {
    console.log('received ip ===> ', rowData);
    const payload = {
      id: rowData.id,
      status: rowData.status
    };
    this.rowName = rowData.name;
    this.appService.updateTableRow(payload).subscribe(response => {
      console.log('response recieved => ', response);
      this.showSaveRowSuccess = true;
      setTimeout(() => {
        this.showSaveRowSuccess = false;
      }, 2000);
    });
  }

  columnSelected($event, col) {
    if ($event && $event.target) {
      if ($event.target.checked) {
        col.selected = true;
      } else {
        col.selected = false;
      }
      this.findSelectedColumns();
    }
  }

  findSelectedColumns() {
    this.selectedColumns = this.columns.filter(col => col.selected);
    this.scrollableColumns = this.columns.filter(col => !col.fixed);
    this.fixedColumns = this.columns.filter(col => col.fixed);
  }
}
