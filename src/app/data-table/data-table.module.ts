import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataTableComponent } from './data-table.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [DataTableComponent],
    declarations: [DataTableComponent]
})
export class DataTableModule { }
