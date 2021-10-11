import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Client } from "../models";
import { ClientService } from "../services";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-create-client',
    templateUrl: './create-client.component.html',
    styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

    @ViewChild('createClientForm', { static : true }) createClientForm: NgForm;

    client: Client;

    constructor(
        private clientService: ClientService,
        private router: Router,
        private commonFunctions: CommonFunctions
    ) { }

    ngOnInit(): void {
        this.client = new Client();
    }

    // NOTE: Envia os dados do cliente para que seja cadastrada.
    createClient() {
        if(this.createClientForm.form.valid) {
            this.client.cnpj = localStorage.getItem('current_company_cnpj') || ""
            this.clientService.registerClient(this.client).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Cliente criado com sucesso!")
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

}
