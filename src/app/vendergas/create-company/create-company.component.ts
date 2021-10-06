import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Company } from "../models";
import { CompanyService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-company',
    templateUrl: './create-company.component.html',
    styleUrls: ['./create-company.component.css']
})

export class CreateCompanyComponent implements OnInit {

    @ViewChild('createCompanyForm', { static : true }) createCompanyForm: NgForm;

    company: Company;

    constructor(
        private companyService: CompanyService,
		private router: Router,
		private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.company = new Company();
    }
    // NOTE: Faz algumas validações e envia os dados da empresa para que seja cadastrada.
    createCompany() {
        if (this.createCompanyForm.form.valid) {

            this.companyService.registerCompany(this.company).subscribe(
                response => {
                    this.openSnackBar("Empresa criada com sucesso!")
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
