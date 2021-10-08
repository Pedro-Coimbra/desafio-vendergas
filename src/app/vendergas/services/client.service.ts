import { Injectable } from '@angular/core';
import { Client } from '../models';
import { ApiServices } from './api.services';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private apiServices: ApiServices) { }

    // NOTE: Criar cliente
    registerClient(client: Client): Observable<Client> {
        return this.apiServices.set(client, "client")
    }
    // NOTE: Criar cliente
    getAllClients(cnpj: any): Observable<any> {
        return this.apiServices.set({'cnpj': cnpj}, "client/getAll" )
    }
    // Edita um cliente
    updateClient(client: Client): Observable<any[]> {
        return this.apiServices.set(client,"client/updateOne")
    }
    // Retorna um cliente
    getOneClient(email: string): Observable<any[]> {
        return this.apiServices.getOne({'email': email},"client/getOne")
    }
    // Exclui um cliente
    deleteClient(email: string): Observable<any[]> {
        return this.apiServices.set({'email': email},"client/delete")
    }
}
