import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../models";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
    currentProduct = ""
    product: Product;

    @ViewChild('editProductForm', { static : true }) editProductForm: NgForm;

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private commonFunctions: CommonFunctions
    ) { }

    ngOnInit(): void {
        this.product = new Product();
        // NOTE: Pega o id do produto atual pelo localStorage
        this.currentProduct = localStorage.getItem('current_product_id') || ""
        this.route.params.subscribe(
            (success) => {
                this.getProduct();
            }
        );
    }

    // NOTE: Faz a pesquisa do produto atual que será editado
    getProduct() {
        this.productService.getOneProduct(this.currentProduct).subscribe(
            (value) => {
                this.editProductForm.controls["nome"].setValue(value[0].nome)
                this.editProductForm.controls["descricao"].setValue(value[0].descricao)
                this.editProductForm.controls["valor"].setValue(value[0].valor)
            },
            (error) => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                console.log(error);
            }
        )
    }

    // NOTE: Envia o registro do produto para ser editado.
    editProduct() {
        if (this.editProductForm.form.valid) {
            this.product.id = +this.currentProduct
            this.productService.updateProduct(this.product).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Produto editado com sucesso!")
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
