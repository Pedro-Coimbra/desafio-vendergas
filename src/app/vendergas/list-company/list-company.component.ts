import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import { Company } from "../models";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogCompanyData {
    nomeFantasia: string;
}


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
        public dialog: MatDialog
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

    // NOTE: Seta o cnpj da empresa no localStorage e redireciona a página
    // para a página de edição
    goToEdit(company: any) {
        localStorage.setItem('current_company_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/edit-company']);
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

    // NOTE: Seta o cnpj da empresa no localStorage e redireciona a página
    // para a página de criação de cliente
    goToCreateClient(company: any): any {
        localStorage.setItem('current_company_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/create-client']);
    }

    // NOTE: Aciona o componente do dialog
    deleteCompany(company: any): void {
        const dialogRef = this.dialog.open(DeleteCompanyDialog, {
            width: '250px',
            data: { nomeFantasia: company.nomeFantasia }
        });

        dialogRef.afterClosed().subscribe(result => {
            // NOTE: Caso o usuário tenha confirmado a deleção o registro da
            // empresa para ser deletado
            if (result == true) {

                this.companyService.deleteCompany(company.cnpj).subscribe(
                    (value) => {
                        // NOTE: Atualiza os dados da tabela
                        this.getAllCompanies();
                    },
                    (error) => {
                        // TODO: Por algum motivo mesmo deletando tudo corretamente
                        // ele cai aqui no "error"
                        // NOTE: Atualiza os dados da tabela
                        this.companyService.getAllCompanies().subscribe(
                            (value) => {
                                this.companies = value;
                            },
                            (error) => {
                                console.log(error);
                            }
                        )
                    }
                )
            }
        });
    }
    // NOTE: Redireciona o usuário para a lista de clientes e adiciona o cnpj
    // da empresa no localStorage
    goToListClients(company: any) {
        localStorage.setItem('current_client_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/list-client']);
    }
    // NOTE: Redireciona o usuário para a lista de produtos e adiciona o cnpj
    // da empresa no localStorage
    goToListProducts(company: any) {
        localStorage.setItem('current_product_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/list-product']);
    }
    // NOTE: Redireciona o usuário para a criação de produtos e adiciona o cnpj
    // da empresa no localStorage
    goToCreateProduct(company: any){
        localStorage.setItem('current_product_cnpj', company.cnpj);
        this.router.navigate(['/vendergas/create-product']);
    } 
}

// NOTE: Componente do dialog de delete
@Component({
    selector: 'delete-company-dialog',
    templateUrl: 'delete-company-dialog.html',
})
export class DeleteCompanyDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteCompanyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogCompanyData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}