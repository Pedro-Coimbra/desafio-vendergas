import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Client, Company } from "../models";
import { ClientService, CompanyService } from "../services";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-create-client',
    templateUrl: './create-client.component.html',
    styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

    @ViewChild('createClientForm', { static: true }) createClientForm: NgForm;

    nomeFantasia = ""
    client: Client;

    constructor(
        private clientService: ClientService,
        private router: Router,
        private commonFunctions: CommonFunctions,
        private companyService: CompanyService
    ) { }

    async ngOnInit(): Promise<void> {
        this.client = new Client();

        const cnpj = localStorage.getItem('current_cnpj') || ""
        // NOTE: Busca a empresa atual e adiciona o nome dela no formulário
        this.companyService.getOneCompany(cnpj).subscribe(
            response => {
                this.nomeFantasia = response[0].nomeFantasia;

            },
            error => {
                if (error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                this.commonFunctions.openSnackBar(error.error.message);
            }
        )
    }

    // NOTE: Envia os dados do cliente para que seja cadastrada.
    createClient() {
        if (this.createClientForm.form.valid) {

            this.clientService.registerClient(this.client).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Cliente criado com sucesso!")
                },
                error => {
                    if (error.status == 401) {
                        this.commonFunctions.goToLogin();
                    }
                    this.commonFunctions.openSnackBar(error.error.message)
                }
            )
        }
    }

}
