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
    registerOrder(order: Order): Observable<any> {
        return this.apiServices.set(order, "order")
    }
    // NOTE: Adiciona um produto a um pedido
    addProductToOrder(order: Order): Observable<any> {
        return this.apiServices.set(order, "order/addProduct")
    }

    // NOTE: Exclui um produto de um pedido
    deleteProduct(pedidoNumero: number, produtoId: number): Observable<any[]> {
        return this.apiServices.set({
            'pedidoNumero': pedidoNumero,
            'produtoId': produtoId
        },"order/deleteProduct")
    }

    // NOTE: Retorna todos os pedidos com seus produtos
    getAllOrdersAndProducts(cnpj: any): Observable<any> {
        return this.apiServices.set({'cnpj': cnpj}, "order/getAllOrdersAndProducts" )
    }
}
