import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Client } from "../models";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonFunctions } from '../shared';

export interface DialogClientData {
    nome: string;
}


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
        public dialog: MatDialog,
        private commonFunctions: CommonFunctions
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

    // NOTE: Seta o email do cliente no localStorage e redireciona a página
    // para a página de edição
    goToEdit(client: any) {
        localStorage.setItem('current_client_email', client.email);
        this.router.navigate(['/vendergas/edit-client']);
    }

    // NOTE: Pega todos os clientes que estão relacionadas a empresa previamente 
    // selecionada para que sejam apresentados na tabela.
    getAllClients(): any {
        const cnpj = localStorage.getItem('current_cnpj') || ""
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

    // NOTE: Função que aciona o dialog de deleção de cliente
    deleteClient(client: any): void {

        const dialogRef = this.dialog.open(DeleteClientDialog, {
            width: '250px',
            data: { nomeFantasia: client.nomeFantasia }
        });

        dialogRef.afterClosed().subscribe(result => {
            // NOTE: Caso o usuário tenha confirmado a deleção, o registro do
            // cliente é enviado para ser deletado
            if (result == true) {

                this.clientService.deleteClient(client.email).subscribe(
                    (value) => {
                        // NOTE: Atualiza os dados da tabela
                        this.getAllClients()
                    },
                    (error) => {
                        if(error.status == 401) {
                            this.commonFunctions.goToLogin();
                        }
                        // TODO: Por algum motivo mesmo deletando tudo corretamente
                        // ele cai aqui no "error"
                        // NOTE: Atualiza os dados da tabela
                        this.getAllClients()
                    }
                )
            }
        });

    }

}

// NOTE: Componente do dialog de delete
@Component({
    selector: 'delete-client-dialog',
    templateUrl: 'delete-client-dialog.html',
})
export class DeleteClientDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteClientDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogClientData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}