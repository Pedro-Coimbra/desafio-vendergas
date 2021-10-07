import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ApiServices, UserService } from "./services";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ListCompanyComponent, DeleteDialog } from './list-company/list-company.component';
import { MatTableModule } from '@angular/material/table';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        CreateCompanyComponent,
        ListCompanyComponent,
        EditCompanyComponent,
        DeleteDialog,
        CreateClientComponent,
        ListClientComponent
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
        MatTableModule,
        MatDialogModule,
        MatButtonToggleModule
    ],
    providers: [
        UserService,
        ApiServices
    ]
})
export class VendergasModule { }
