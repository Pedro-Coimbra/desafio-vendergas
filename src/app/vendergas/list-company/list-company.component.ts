import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Company } from "../models";

@Component({
    selector: 'app-list-company',
    templateUrl: './list-company.component.html',
    styleUrls: ['./list-company.component.css']
})

export class ListCompanyComponent implements OnInit {


    companies: Company[];
    displayedColumns: string[] = ['nomeFantasia', 'razaoSocial', 'cnpj', 'actions'];


    constructor(
        private companyService: CompanyService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    // NOTE: Ao iniciar a página a função "getAllCompanies" é chamada para que a
    // tabela seja populada
    ngOnInit(): void {
        this.route.params.subscribe(
            (success) => {
                this.getAllCompanies()
            }
        );
    }

    // NOTE: Seta o cnpj da empresa no  localStorage e redireciona a página
    // para a página de edição
    goToEdit(company: any) {
        localStorage.setItem('current_company_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/edit-company']);
    }

    // TODO: Implementar o deletar empresa.
    deleteCompany(company: any) {

    }

    // NOTE: Pega todas empresas que o usuário criou e adiciona na variavel "companies"
    // para que sejam apresentadas na tabela.
    getAllCompanies(): any {
        this.companyService.getAllCompanies().subscribe(
            (value) => {
                this.companies = value

            },
            (error) => {
                console.log(error);
            }
        )
    }

}
