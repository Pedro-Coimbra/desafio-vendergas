import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderProduct } from "../models";
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

    orderProducts = new MatTableDataSource<OrderProduct>([]);
    displayedColumns: string[] = ['pedidoNumero', 'observacao', 'dataPedido', 'nomeCliente', 'produtos', 'actions'];

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        // NOTE: Assim que o componente é acionado a pesquisa dos pedidos é feita
        this.route.params.subscribe(
            (success) => {
                this.getAllOrdersAndProducts()
            }
        );
    }

    // NOTE: Procura todos os pedidos criados naquela empresa
    getAllOrdersAndProducts(): any {
        const cnpj = localStorage.getItem('current_order_cnpj') || ""
        this.orderService.getAllOrdersAndProducts(cnpj).subscribe(
            (value) => {

                for(var idx in value) {
                    var produtos = []
                    for(var idx2 in value[idx].produtos) {
                        produtos.push(value[idx].produtos[idx2].nome)
                    }
                    // NOTE: Monta os dados da tabela
                    this.orderProducts.data.push({
                        'pedidoNumero': value[idx].numero,
                        'observacao': value[idx].observacao,
                        'nomeCliente': value[idx].cliente.nome,
                        'dataPedido': value[idx].createdAt,
                        'produtos': produtos
                    })
                }
                // NOTE: Refresh da tabela
                this.orderProducts._updateChangeSubscription();
            },
            (error) => {
                console.log(error);
            }
        )
    }
    // NOTE: Vai para a página de edição de pedidos e adiciona o numero do pedido no "localStorage"
    goToEdit(order: any) {
        localStorage.setItem('current_order_number', order.pedidoNumero);
        this.router.navigate(['/vendergas/edit-order']);
    }

}
