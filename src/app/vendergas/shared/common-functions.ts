import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CommonFunctions {

    constructor(
        private _snackBar: MatSnackBar,
        private router: Router
    ) { }

    openSnackBar(message: string) {
        this._snackBar.open(message, "Undo", {
            duration: 5000
        })
    }
    goToLogin() {
        this.router.navigate(['/vendergas/login']);
    }
}