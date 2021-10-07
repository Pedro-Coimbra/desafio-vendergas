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

}
