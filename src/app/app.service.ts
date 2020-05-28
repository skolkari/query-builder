import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private httpClient: HttpClient) { }

    fetchRecords(payload) {
        return this.httpClient.post('http://localhost:8080/generate', payload).pipe(res => res );
    }
}
