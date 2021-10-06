import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CompanyService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from "@angular/router";
import { Company } from "../models";

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
        private _snackBar: MatSnackBar
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
                console.log(error);
            }
        )
    }

    // NOTE: Envia os dados do formulário para serem editados
    editCompany() {
        if (this.editCompanyForm.form.valid) {
            this.companyService.updateCompany(this.company).subscribe(
                response => {
                    this.openSnackBar("Empresa editada com sucesso!")
                },
                error => {
                    this.openSnackBar(error.error.message)
                }
            )
        }
    }

    // TODO: Generalizar essa função, já que ela está sendo utilizada em vários locais
    // NOTE: Adiciona um SnackBar na tela que dura 5 segundos
    openSnackBar(message: string) {
        this._snackBar.open(message, "Undo", {
            duration: 5000
        })
    }
}
