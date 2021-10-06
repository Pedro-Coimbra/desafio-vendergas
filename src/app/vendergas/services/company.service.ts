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
    // Retorna todas as empresas do usuário atual
    getAllCompanies(): Observable<any[]> {
        return this.apiServices.get("company/getAll")
    }
    // Retorna uma empresa do usuário atual
    getOneCompany(cnpj: string): Observable<any[]> {
        return this.apiServices.getOne({'cnpj': cnpj},"company/getOne")
    }
    // Edita uma empresa do usuário atual
    updateCompany(company: Company): Observable<any[]> {
        return this.apiServices.set(company,"company/updateOne")
    }
}
