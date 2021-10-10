import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Order, Product, Client } from "../models";
import { OrderService, ProductService, ClientService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

    @ViewChild('createOrderForm', { static: true }) createOrderForm: NgForm;

    order: Order;
    clients: Client[];
    products: Product[];

    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private clientService: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.order = new Order();
        // NOTE: Ao iniciar a página as funções "getAllClients" e getAllProducts são 
        // chamadas para que os selects sejam populados
        this.route.params.subscribe(
            (success) => {
                this.getAllClients()
                this.getAllProducts()
            }
        );

    }

    // NOTE: Pega todos os clientes que estão relacionadas a empresa em que o
    // pedido está sendo criado para que sejam apresentados no select de clientes.
    getAllClients(): any {
        const cnpj = localStorage.getItem('current_order_cnpj') || ""
        this.clientService.getAllClients(cnpj).subscribe(
            (value) => {
                this.clients = value

            },
            (error) => {
                console.log(error);
            }
        )
    }
    // NOTE: Pega todos os produtos que estão relacionadas a empresa em que o
    // pedido está sendo criado para que sejam apresentados no select de produtos.
    getAllProducts(): any {
        const cnpj = localStorage.getItem('current_order_cnpj') || ""
        this.productService.getAllProducts(cnpj).subscribe(
            (value) => {
                this.products = value

            },
            (error) => {
                console.log(error);
            }
        )
    }

    // NOTE: Envia os dados do pedido para que seja cadastrada.
    createOrder() {
        if (this.createOrderForm.form.valid) {
            this.order.cnpj = localStorage.getItem('current_order_cnpj') || ""
            this.orderService.registerOrder(this.order).subscribe(
                response => {
                    this.openSnackBar("Pedido criado com sucesso!")
                },
                error => {
                    this.openSnackBar(error.error.message)
                }
            )
        }
    }

    // NOTE: Retorna para a página que lista de empresas 
    goToList() {
        this.router.navigate(['/vendergas/list-company']);
    }

    // NOTE: Adiciona um SnackBar na tela que dura 5 segundos
	openSnackBar(message: string) {
		this._snackBar.open(message, "Undo",{
			duration: 5000
		})
	}
}
