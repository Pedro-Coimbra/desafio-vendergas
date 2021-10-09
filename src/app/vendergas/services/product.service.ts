import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';
import { ApiServices } from './api.services';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private apiServices: ApiServices) { }

    // NOTE: Cria um produto
    registerProduct(product: Product): Observable<Product> {
        return this.apiServices.set(product, "product")
    }
    // NOTE: Retorna todos os produtos
    getAllProducts(cnpj: any): Observable<any> {
        return this.apiServices.set({'cnpj': cnpj}, "product/getAll" )
    }
}
