import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../models";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

    products: Product[];
    displayedColumns: string[] = ['nome', 'descricao', 'valor', 'actions'];

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        // NOTE: Ao iniciar a página a função "getAllProducts" é chamada para que a
        // tabela de produtos seja populada
        this.route.params.subscribe(
            (success) => {
                this.getAllProducts()
            }
        );
    }

    // NOTE: Pega todos os produtos que estão relacionadas a empresa previamente 
    // selecionada para que sejam apresentados na tabela.
    getAllProducts(): any {
        const cnpj = localStorage.getItem('current_product_cnpj') || ""
        this.productService.getAllProducts(cnpj).subscribe(
            (value) => {
                this.products = value

            },
            (error) => {
                console.log(error);
            }
        )
    }
    // NOTE: Seta o id do produto no localStorage e redireciona a página
    // para a página de edição
    goToEdit(product: any) {
        localStorage.setItem('current_product_id', product.id);
        this.router.navigate(['/vendergas/edit-product']);
    }
}
