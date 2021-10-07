import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Client } from "../models";

@Component({
    selector: 'app-list-client',
    templateUrl: './list-client.component.html',
    styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

    clients: Client[];
    displayedColumns: string[] = ['nome', 'email', 'telefone', 'actions'];

    constructor(
        private clientService: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        // public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        // NOTE: Ao iniciar a página a função "getAllClients" é chamada para que a
        // tabela de clientes seja populada
        this.route.params.subscribe(
            (success) => {
                this.getAllClients()
            }
        );
    }

    // NOTE: Pega todos os clientes que estão relacionadas a empresa previamente 
    // selecionada para que sejam apresentados na tabela.
    getAllClients(): any {
        const cnpj = localStorage.getItem('current_company_cnpj') || ""
        this.clientService.getAllClients(cnpj).subscribe(
            (value) => {
                this.clients = value

            },
            (error) => {
                console.log(error);
            }
        )
    }

}
