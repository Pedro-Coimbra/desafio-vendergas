import { Injectable } from '@angular/core';
import { Company } from '../models';
import { ApiServices } from './api.services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    constructor(private apiServices: ApiServices) { }

    // NOTE: Criar empresa
    registerCompany(company: Company): Observable<Company> {
        return this.apiServices.set(company, "company")
    }

}
