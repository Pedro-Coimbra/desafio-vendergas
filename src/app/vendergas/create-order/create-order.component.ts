import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Order, Product, Client, OrderProduct } from "../models";
import { OrderService, ProductService, ClientService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

    @ViewChild('createOrderForm', { static: true }) createOrderForm: NgForm;
    @ViewChild('createOrderProductForm', { static: true }) createOrderProductForm: NgForm;
    orderProducts = new MatTableDataSource<OrderProduct>([]);

    displayedColumns: string[] = ['nomeProduto', 'quantidade', 'actions'];
    isLinear = true;
    orderNumber = 0
    order: Order;
    clients: Client[];
    products: Product[];

    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private clientService: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        private commonFunctions: CommonFunctions
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
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
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
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
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
                    this.orderNumber = response.numero
                    this.commonFunctions.openSnackBar("Pedido criado com sucesso!")
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

    // NOTE: Envia o produto para que ele seja cadastrado no pedido
    addProduct() {
        if (this.createOrderProductForm.form.valid) {

            for (var idx in this.orderProducts.data) {

                if (this.orderProducts.data[idx]['produtoId'] == this.order.produtoId) {

                    this.commonFunctions.openSnackBar("Esse produto já foi adicionado ao pedido")
                    return
                }
            }
            this.order.pedidoNumero = this.orderNumber
            this.orderService.addProductToOrder(this.order).subscribe(
                response => {
                    // NOTE: Adiciona o produto que foi cadastrado na tabela de produtos do pedido
                    this.orderProducts.data.push({
                        'nomeProduto': response.product.nome,
                        'quantidade': response.orderProduct.quantidade,
                        'pedidoNumero': response.orderProduct.pedidoNumero,
                        'produtoId': response.orderProduct.produtoId
                    })
                    this.orderProducts._updateChangeSubscription();

                    this.commonFunctions.openSnackBar("Produto adicionado com sucesso!")
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

    // NOTE: Envia o registro do produto para que seja deletado
    deleteProduct(product: any) {

        // NOTE: Procura pela posicao do produto que será removido e o retira da
        // tabela
        for (var p in this.orderProducts.data) {

            if (this.orderProducts.data[p].produtoId == product.produtoId) {

                this.orderProducts.data.splice(+p, 1);
                this.orderProducts._updateChangeSubscription();
                break;
            }

        }
        // NOTE: Envia as chaves do produto para que ele seja removido do pedido
        this.orderService.deleteProduct(product.pedidoNumero, product.produtoId).subscribe(
            response => {
                this.commonFunctions.openSnackBar("Produto retirado com sucesso!")
            },
            error => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                this.commonFunctions.openSnackBar("Produto retirado com sucesso!")
            }
        )
    }

    // NOTE: Retorna para a página que lista os pedidos 
    goToList() {
        this.router.navigate(['/vendergas/list-order']);
    }


}
