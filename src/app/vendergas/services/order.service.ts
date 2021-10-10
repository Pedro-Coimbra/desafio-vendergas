import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models';
import { ApiServices } from './api.services';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private apiServices: ApiServices) { }

    // NOTE: Cria um produto
    registerOrder(order: Order): Observable<Order> {
        return this.apiServices.set(order, "order")
    }

}
