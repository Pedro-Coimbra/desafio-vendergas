import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models";
import { UserService } from "../services";
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	@ViewChild('signUpForm', { static: true }) signUpForm: NgForm;

	user: User;

	constructor(
		private userService: UserService,
		private router: Router,
		private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.user = new User();
	}

	// NOTE: Redireciona o usuário a página de login
	goToLogin() {
		this.router.navigate(['/vendergas/login']);
	}

	// NOTE: Faz algumas validações e envia os dados do usuário para que seja cadastrado.
	signUp() {
		var senha = this.user.senha
		var confSenha = this.user.confSenha

		// NOTE: Valida se as senhas são iguais, caso não é retornado um snackbar
		// para o usuário avisando do problema.
		if (senha !== confSenha) {
			this.openSnackBar("As senhas não coincidem!")
			return;
		}

		// NOTE: Caso o formulário seja valido o usuário é enviado para ser cadastrado
		// o retorno é apresentado para o usuário em forma de snackbar.
		if (this.signUpForm.form.valid) {
			this.userService.registerUser(this.user).subscribe(
				response => {
					this.openSnackBar("Usuário criado com sucesso!")
				},
				error => {
					this.openSnackBar(error.error.message)
				});
		}
	}
	// NOTE: Adiciona um SnackBar na tela que dura 5 segundos
	openSnackBar(message: string) {
		this._snackBar.open(message, "Undo",{
			duration: 5000
		})
	}
}