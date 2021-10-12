import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Company } from "../models";
import { CompanyService } from "../services";
import { CommonFunctions } from '../shared';

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
		private commonFunctions: CommonFunctions) { }

    ngOnInit(): void {
        this.company = new Company();
    }
    // NOTE: Faz algumas validações e envia os dados da empresa para que seja cadastrada.
    createCompany() {
        if (this.createCompanyForm.form.valid) {

            this.companyService.registerCompany(this.company).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Empresa criada com sucesso!")
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
    // NOTE: Retorna para a página que lista as empresas 
    goToList() {
        this.router.navigate(['/vendergas/list-company']);
    }

}
