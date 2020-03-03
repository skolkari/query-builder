import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit, OnChanges {
  @Input() paginationType = 'pagination';
  @Input() columns: any[] = [];
  @Input() fixedColumns: any[] = [];
  @Input() rows: any[] = [];
  @Input() pageSize: any[] = [5, 10, 25, 50, 100];

  selectedPageSize = 5;
  displayRows: any[] = [];
  overflowX = false;
  overflowY = false;
  pageInfo: any = {};
  curPage = -1;
  fixedBodyHeight: any;
  noRows = false;

  ngOnInit() {
    // this.updatePageSize(this.selectedPageSize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log('changes =>' , changes);
      
      if (changes.paginationType) {
        if (changes.paginationType.currentValue === 'infinitescroll') {
          this.selectedPageSize = 10;
        } else {
          this.selectedPageSize = 5;
        }
      }

      if (changes.columns) {
        if (document.getElementById('data-table-header')) {
          document.getElementById('data-table-header').scrollLeft = 0;
        }
        if (document.getElementById('data-table-body')) {
          document.getElementById('data-table-body').scrollLeft = 0;
          document.getElementById('data-table-body').scrollTop = 0;
        }

        if (this.paginationType === 'infinitescroll') {
          this.selectedPageSize = 10;
        } else {
          this.selectedPageSize = 5;
        }
      }

      if(this.rows.length > 0) {
        this.noRows = false;
        this.updatePageSize(this.selectedPageSize);
      } else {
        this.noRows = true;
      }
    }
  }

  updatePageSize($event) {
    console.log('updating page size');
    
    this.selectedPageSize = $event;

    // whenever number of records per page changes, navigate user to first page
    this.setPage(1);
  }

  adjustTableHeader() {
    if (this.displayRows && this.displayRows.length > 0) {
      setTimeout(() => {
        const firstFixedTableRowCells = document.getElementsByClassName('fixed-column-data-row')[0].children;
        const firstTableRowCells = document.getElementsByClassName('data-row')[0].children;
        const tableBody = document.getElementsByClassName('table-body')[0];

        if (tableBody.clientWidth < tableBody.scrollWidth) {
          this.overflowX = true;
          // 6 is scrollbar width
          this.fixedBodyHeight = (document.getElementById('data-table-body').offsetHeight - 6) + 'px';
        } else {
          this.overflowX = false;
          this.fixedBodyHeight = document.getElementById('data-table-body').offsetHeight + 'px';
        }

        if (tableBody.clientHeight < tableBody.scrollHeight) {
          this.overflowY = true;
        } else {
          this.overflowY = false;
        }

        this.fixedColumns.forEach((column, i) => {
          column.width = window.getComputedStyle(firstFixedTableRowCells.item(i)).width;
        });

        this.columns.forEach((column, i) => {
          // pick first data row
          // take it's cell widths
          // assign exact widths to cells in header to
          // make header cells look aligned with cells in table body
          if (i === firstTableRowCells.length - 1 && this.overflowX) { // last-data-cell
            const lastCellWidth = parseInt(window.getComputedStyle(firstTableRowCells.item(i)).width.replace('px', ''), 10);
            // 6 is scrollbar width
            column.width = (lastCellWidth + 6) + 'px';
          } else {
            column.width = window.getComputedStyle(firstTableRowCells.item(i)).width;
          }
        });
      });
    } else {
      this.fixedColumns.forEach((column, i) => {
        column.width = '150px';
      });
      this.columns.forEach((column, i) => {
        column.width = '150px';
      });
    }
  }

  setPage(page: number) {
    this.curPage = page;

    // get pager object from service
    this.pageInfo = this.getPaginationMetadata(this.rows.length, page, this.selectedPageSize);

    // get current page of items
    if (this.paginationType === 'infinitescroll') {
      this.displayRows = this.rows.slice(0, this.pageInfo.endIndex + 1);
    } else {
      this.displayRows = this.rows.slice(this.pageInfo.startIndex, this.pageInfo.endIndex + 1);
    }
    this.adjustTableHeader();
  }

  getPaginationMetadata(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + (pageSize - 1), totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  tableBodyScrolled($event) {
    document.getElementById('data-table-header').scrollLeft = $event.target.scrollLeft;
    document.getElementById('data-table-fixed-column-body').scrollTop = $event.target.scrollTop;
    if (this.paginationType === 'infinitescroll') {
      if (((Math.round($event.target.scrollHeight / 2)) - (Math.round($event.target.scrollTop))) <= 20) {
        this.setPage(this.curPage + 1);
      }
    }
  }

}
