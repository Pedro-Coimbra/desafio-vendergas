import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

// NOTE: Define o token do usuário de acordo com o "localStorage"

@Injectable()
export class ApiServices {
    constructor(private http: HttpClient) { }

    public set(any: any, path: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem('access_token') || ""
            })
        };
        return this.http.post(`${environment.root_url}${path}`, any, httpOptions);
    }

    public login(body: Object = {}, path: string): Observable<any> {

        return this.http.post(`${environment.root_url}${path}`, body, {
            withCredentials: true
        });
    }

    public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        // console.log(httpOptions)
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem('access_token') || ""
            })
        };
        return this.http.get(`${environment.root_url}${path}`, httpOptions);
    }

    public getOne(any: any, path: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem('access_token') || ""
            })
        };
        return this.http.post(`${environment.root_url}${path}`, any, httpOptions);
    }

}