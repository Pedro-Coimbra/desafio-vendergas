import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class ApiServices {
    constructor(private http: HttpClient) { }

    public set(any: any, path: string): Observable<any> {

        return this.http.post(`${environment.root_url}${path}`, any);
    }

    public login(body: Object = {}, path: string): Observable<any> {

        return this.http.post(`${environment.root_url}${path}`, body, {
            withCredentials: true
        });
    }

}