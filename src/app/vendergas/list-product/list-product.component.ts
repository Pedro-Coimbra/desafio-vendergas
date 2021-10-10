import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../models";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogProductData {
    nome: string;
}

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
        public dialog: MatDialog
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

    // NOTE: Função que aciona o dialog de deleção de produto
    deleteProduct(product: any): void {

        const dialogRef = this.dialog.open(DeleteProductDialog, {
            width: '250px',
            data: { nome: product.nome }
        });

        dialogRef.afterClosed().subscribe(result => {
            // NOTE: Caso o usuário tenha confirmado a deleção, o registro do
            // produto é enviado para ser deletado
            if (result == true) {

                this.productService.deleteProduct(product.id).subscribe(
                    (value) => {
                        // NOTE: Atualiza os dados da tabela
                        this.getAllProducts()
                    },
                    (error) => {
                        // TODO: Por algum motivo mesmo deletando tudo corretamente
                        // ele cai aqui no "error"
                        // NOTE: Atualiza os dados da tabela
                        this.getAllProducts()
                    }
                )
            }
        });
    }
}

// NOTE: Componente do dialog de delete
@Component({
    selector: 'delete-product-dialog',
    templateUrl: 'delete-product-dialog.html',
})
export class DeleteProductDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteProductDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogProductData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}