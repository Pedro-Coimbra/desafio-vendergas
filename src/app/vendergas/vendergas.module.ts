import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApiServices, UserService } from "./services";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        CreateCompanyComponent,
        ListCompanyComponent,
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatTableModule
    ],
    providers: [
        UserService,
        ApiServices
    ]
})
export class VendergasModule { }
