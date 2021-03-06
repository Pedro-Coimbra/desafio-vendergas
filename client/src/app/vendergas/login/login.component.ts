import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models";
import { UserService } from "../services";
import { CommonFunctions } from '../shared';
import { AppComponent } from '../../app.component';

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
        private commonFunctions: CommonFunctions,
        private appComponent: AppComponent,
        ) { }


    ngOnInit(): void {
        this.user = new User();
        this.appComponent.logged = false
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
                    // NOTE: Define o token do usuário e p seu nome no localstorage
                    localStorage.setItem('access_token', response.token);
                    localStorage.setItem('username', response.nome);
                    this.commonFunctions.openSnackBar("Usuário autenticado com sucesso!")
                    this.router.navigate(['/vendergas/list-company']);
                    // NOTE: Se os botões aparecem na toolbar
                    this.appComponent.logged = true
                    // NOTE: Nome do usuário na toolbar
                    this.appComponent.nomeUsuario = response.nome

                },
                error => {
                    this.commonFunctions.openSnackBar(error.error.message)
                });
        }
    }

}
