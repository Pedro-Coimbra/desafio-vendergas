import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Client } from "../models";
import { ClientService } from "../services";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

    @ViewChild('editClientForm', { static: true }) editClientForm: NgForm;

    currentEmail = ""
    client: Client;

    constructor(
        private clientService: ClientService,
        private commonFunctions: CommonFunctions,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.client = new Client();
        // NOTE: Pega o email do cliente atual pelo localStorage
        this.currentEmail = localStorage.getItem('current_client_email') || ""
        this.route.params.subscribe(
            (success) => {
                this.getClient();
            }
        );
    }

    // NOTE: Retorna para a página que lista os clientes 
    goToList() {
        this.router.navigate(['/vendergas/list-client']);
    }

    // NOTE: Envia os dados do formulário para serem editados
    editClient() {
        if (this.editClientForm.form.valid) {

            this.clientService.updateClient(this.client).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Cliente editado com sucesso!")
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

    // NOTE: Retorna os dados do cliente e popula o formulário
    getClient() {
        this.clientService.getOneClient(this.currentEmail).subscribe(
            (value) => {
                this.editClientForm.controls["nome"].setValue(value[0].nome)
                this.editClientForm.controls["email"].setValue(value[0].email)
                this.editClientForm.controls["telefone"].setValue(value[0].telefone)
            },
            (error) => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                console.log(error);
            }
        )
    }

}
