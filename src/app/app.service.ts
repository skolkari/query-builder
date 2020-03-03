import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private httpClient: HttpClient) { }

    getTableData() {
        // return this.httpClient.get('../assets/api/mock-data.json');
        return this.httpClient.get('http://localhost:3000/gettabledata');
    }

    updateTableRow(payload) {
        // return of({
        //     status: 200,
        //     message: 'success'
        // });
        return this.httpClient.post('http://localhost:3000/saverow', payload).pipe(res => res );
    }

}
