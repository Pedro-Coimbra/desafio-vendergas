import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../models";


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
        private _snackBar: MatSnackBar
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
                    this.openSnackBar("Produto editado com sucesso!")
                },
                error => {
                    this.openSnackBar(error.error.message)
                }
            )
        }
    }

    // NOTE: Adiciona um SnackBar na tela que dura 5 segundos
    openSnackBar(message: string) {
        this._snackBar.open(message, "Undo", {
            duration: 5000
        })
    }

    // NOTE: Retorna para a página que lista os produtos 
    goToList() {
        this.router.navigate(['/vendergas/list-product']);
    }

}
