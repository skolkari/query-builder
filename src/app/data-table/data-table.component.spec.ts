import { TestBed, inject } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('a data-table component', () => {
  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableComponent
      ],
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
