import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Product } from "../models";
import { ProductService } from "../services";
import { Router } from "@angular/router";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

    @ViewChild('createProductForm', { static : true }) createProductForm: NgForm;

    product: Product;

    constructor(
        private productService: ProductService,
        private commonFunctions: CommonFunctions,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.product =  new Product();
    }


    // NOTE: Faz algumas validações e envia os dados do produto para que seja cadastrada.
    createProduct() {
        if (this.createProductForm.form.valid) {
            this.product.cnpj = localStorage.getItem('current_product_cnpj') || ""

            this.productService.registerProduct(this.product).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Produto criado com sucesso!")
                },
                error => {
                    if(error.status == 401) {
                        this.commonFunctions.goToLogin();
                    }
                    this.commonFunctions.openSnackBar(error.error.message)
                }
            )
        }
    }

}
