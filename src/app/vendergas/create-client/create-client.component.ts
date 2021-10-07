import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Client } from "../models";
import { ClientService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';


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
        private _snackBar: MatSnackBar
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
                    this.openSnackBar("Cliente criada com sucesso!")
                },
                error => {
                    this.openSnackBar(error.error.message)
                }
            )
        }
    }

    // NOTE: Adiciona um SnackBar na tela que dura 5 segundos
	openSnackBar(message: string) {
		this._snackBar.open(message, "Undo",{
			duration: 5000
		})
	}
}
