import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Product } from "../models";
import { ProductService, CompanyService } from "../services";
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
    nomeFantasia = "";

    constructor(
        private productService: ProductService,
        private companyService: CompanyService,
        private commonFunctions: CommonFunctions,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.product =  new Product();
        const cnpj = localStorage.getItem('current_cnpj') || ""
        // NOTE: Busca a empresa atual e adiciona o nome dela no formulário
        this.companyService.getOneCompany(cnpj).subscribe(
            response => {
                this.nomeFantasia = response[0].nomeFantasia;

            },
            error => {
                if (error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                this.commonFunctions.openSnackBar(error.error.message);
            }
        )
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
    // NOTE: Retorna para a página que lista os produtos 
    goToList() {
        this.router.navigate(['/vendergas/list-product']);
    }
}
