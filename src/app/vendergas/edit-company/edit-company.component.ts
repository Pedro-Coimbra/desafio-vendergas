import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CompanyService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Company } from "../models";
import { CommonFunctions } from '../shared';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
    currentCnpj = ""
    company: Company;

    @ViewChild('editCompanyForm', { static : true }) editCompanyForm: NgForm;

    constructor(
        private companyService: CompanyService,
        private router: Router,
        private route: ActivatedRoute,
        private commonFunctions: CommonFunctions
    ) { }

    ngOnInit(): void {
        this.company = new Company();
        // NOTE: Pega o CNPJ da empresa atual pelo localStorage
        this.currentCnpj = localStorage.getItem('current_company_cnpj') || ""
        this.route.params.subscribe(
            (success) => {
                this.getCompany();
            }
        );
    }

    // NOTE: Retorna para a página que lista as empresas 
    goToList() {
        this.router.navigate(['/vendergas/list-company']);
    }

    // NOTE: Retorna os dados da empresa e popula o formulário
    getCompany() {
        this.companyService.getOneCompany(this.currentCnpj).subscribe(
            (value) => {

                this.editCompanyForm.controls["razaoSocial"].setValue(value[0].razaoSocial)
                this.editCompanyForm.controls["nomeFantasia"].setValue(value[0].nomeFantasia)
                this.editCompanyForm.controls["cnpj"].setValue(value[0].cnpj)
            },
            (error) => {
                if(error.status == 401) {
                    this.commonFunctions.goToLogin();
                }
                console.log(error);
            }
        )
    }

    // NOTE: Envia os dados do formulário para serem editados
    editCompany() {
        if (this.editCompanyForm.form.valid) {
            this.companyService.updateCompany(this.company).subscribe(
                response => {
                    this.commonFunctions.openSnackBar("Empresa editada com sucesso!")
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
