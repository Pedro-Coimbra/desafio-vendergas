import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { Client, Company } from "../models";
import { ClientService, CompanyService } from "../services";
import { async, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonFunctions {


    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private companyService: CompanyService
    ) { }

    // NOTE: Adiciona um snackbar na tela com a mensagem enviada que desaparece
    // depois de 5 segundos
    openSnackBar(message: string) {
        this._snackBar.open(message, "Undo", {
            duration: 5000
        })
    }

    // NOTE: Redireciona o usuário a tela de login
    goToLogin() {
        this.router.navigate(['/vendergas/login']);
    }

}