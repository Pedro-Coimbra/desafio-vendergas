import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models";
import { UserService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    @ViewChild('loginForm', { static: true }) loginForm: NgForm;

    user: User;

    constructor(
        private userService: UserService,
        private router: Router,
        private _snackBar: MatSnackBar) { }


    ngOnInit(): void {
        this.user = new User();
    }

    // NOTE: Redireciona o usuário a página de cadastro
    goToSignUp() {
        this.router.navigate(['/vendergas/sing-up']);
    }

    // Verifica se o login do usuário é valido
    login() {
        if (this.loginForm.form.valid) {
            this.userService.loginUser(this.user).subscribe(
                response => {
                    // NOTE: Define o token do usuário no localstorage
                    localStorage.setItem('access_token', response.token);
                    this.openSnackBar("Usuário autenticado com sucesso!")
                    // this.router.navigate(['/vendergas/create-company']);
                },
                error => {
                    this.openSnackBar(error.error.message)
                });
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
