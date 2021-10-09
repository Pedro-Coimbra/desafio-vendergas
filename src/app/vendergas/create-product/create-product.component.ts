import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Product } from "../models";
import { ProductService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.product =  new Product();
    }


    // NOTE: Faz algumas validações e envia os dados do produto para que seja cadastrada.
    createProduct() {
        if (this.createProductForm.form.valid) {
            this.product.cnpj = localStorage.getItem('current_company_cnpj') || ""
            this.productService.registerProduct(this.product).subscribe(
                response => {
                    this.openSnackBar("Produto criado com sucesso!")
                },
                error => {
                    this.openSnackBar(error.error.message)
                }
            )
        }
    }

    // NOTE: Adiciona um SnackBar na tela que dura 5 segundos
	openSnackBar(message: string) {
		this._snackBar.open(message, "Undo",{
			duration: 5000
		})
	}

}
