import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Order, Product, Client, OrderProduct } from "../models";
import { OrderService, ProductService, ClientService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

    @ViewChild('editOrderForm', { static: true }) editOrderForm: NgForm;
    @ViewChild('editOrderProductForm', { static: true }) editOrderProductForm: NgForm;
    orderProducts = new MatTableDataSource<OrderProduct>([]);

    displayedColumns: string[] = ['nomeProduto', 'quantidade', 'actions'];
    isLinear = true;
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
        this.route.params.subscribe(
            (success) => {
                this.getAllClients()
                this.getAllProducts()
                this.getOrder()
            }
        );
    }

    // NOTE: Envia o produto para que ele seja cadastrado no pedido
    addProduct() {
        if (this.editOrderProductForm.form.valid) {

            for (var idx in this.orderProducts.data) {

                if (this.orderProducts.data[idx]['produtoId'] == this.order.produtoId) {

                    this.commonFunctions.openSnackBar("Esse produto já foi adicionado ao pedido")
                    return
                }
            }
            const pedidoNumero = localStorage.getItem('current_order_number') || ""
            this.order.pedidoNumero = +pedidoNumero

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

    // NOTE: Pega todos os clientes que estão relacionadas a empresa em que o
    // pedido está sendo editado para que sejam apresentados no select de clientes.
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
    // pedido está sendo editado para que sejam apresentados no select de produtos.
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

    // NOTE: Pega o pedido atual qu está sendo editado, popula os campos do formulário
    // "editOrderForm" e popula a tabela de produtos do segundo passo
    getOrder() {
        const pedidoNumero = localStorage.getItem('current_order_number') || ""
        this.orderService.getOneOrder(pedidoNumero).subscribe(
            (value) => {

                this.editOrderForm.controls["nomeCliente"].setValue(value[0].fk_cliente_pedido_idx)
                this.editOrderForm.controls["observacao"].setValue(value[0].observacao)

                // NOTE: Adiciona os valores na tabela de produtos
                for (var p in value[0].produtos) {

                    this.orderProducts.data.push({
                        'nomeProduto': value[0].produtos[p].nome,
                        'quantidade': value[0].produtos[p].pedidoProdutos.quantidade,
                        'pedidoNumero': value[0].numero,
                        'produtoId': value[0].produtos[p].id
                    })
                }
                this.orderProducts._updateChangeSubscription();
            },
            (error) => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                console.log(error);
            }
        )
    }

    // NOTE: Envia o registro do pedido para ser editado
    editOrder() {
        const pedidoNumero = localStorage.getItem('current_order_number') || ""
        const cnpj = localStorage.getItem('current_order_cnpj') || ""
        this.order.pedidoNumero = +pedidoNumero
        this.order.cnpj = cnpj

        this.orderService.updateOrder(this.order).subscribe(
            (value) => {
                this.commonFunctions.openSnackBar("Pedido editado com sucesso!")
            },
            (error) => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                console.log(error);
            }
        )
    }

    // NOTE: Retorna para a página que lista os pedidos 
    goToList() {
        this.router.navigate(['/vendergas/list-order']);
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
                this.commonFunctions.openSnackBar("Produto retirado com sucesso!")
                // this.openSnackBar(error.error.message)
            }
        )
    }

}
