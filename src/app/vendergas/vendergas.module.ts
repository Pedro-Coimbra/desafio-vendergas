import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { ApiServices, UserService } from "./services";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ListCompanyComponent, DeleteCompanyDialog } from './list-company/list-company.component';
import { MatTableModule } from '@angular/material/table';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent, DeleteClientDialog } from './list-client/list-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent, DeleteProductDialog } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        CreateCompanyComponent,
        ListCompanyComponent,
        EditCompanyComponent,
        DeleteCompanyDialog,
        CreateClientComponent,
        ListClientComponent,
        EditClientComponent,
        DeleteClientDialog,
        CreateProductComponent,
        ListProductComponent,
        EditProductComponent,
        DeleteProductDialog,
        CreateOrderComponent,
        ListOrderComponent,
        EditOrderComponent
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
        MatButtonToggleModule,
        MatIconModule,
        MatSelectModule,
        MatStepperModule,
        CdkStepperModule
    ],
    providers: [
        UserService,
        ApiServices
    ]
})
export class VendergasModule { }
