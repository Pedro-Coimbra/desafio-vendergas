import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    nomeUsuario = localStorage.getItem('username')
    logged = true;

    constructor(
        private router: Router,
        public dialog: MatDialog,
    ) { }

    // NOTE: Redireciona o usuário para a lista de empresas
    goToListCompanies() {
        this.router.navigate(['/vendergas/list-company']);
    }

    // NOTE: Aciona o dialog de confirmação de logout
    logout() {

        const dialogRef = this.dialog.open(LogoutDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            // NOTE: Caso o usuário tenha confirmado o logout, o localStorage
            // dele é limpo e ele é redirecionado para o login
            if (result == true) {
                localStorage.clear();
                this.logged = false;
                this.router.navigate(['/vendergas/login']);
            }
        });

    }
}

// NOTE: Componente do dialog de logout
@Component({
    selector: 'logout-dialog',
    templateUrl: 'logout-dialog.html',
})
export class LogoutDialog {

    constructor(
        public dialogRef: MatDialogRef<LogoutDialog>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}