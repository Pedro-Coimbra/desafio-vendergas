import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignUpComponent, CreateCompanyComponent, ListCompanyComponent, 
  EditCompanyComponent, CreateClientComponent, ListClientComponent, EditClientComponent,
  CreateProductComponent, ListProductComponent, EditProductComponent, CreateOrderComponent,
  ListOrderComponent, EditOrderComponent } from './vendergas';

// NOTE: Rotas da aplicação
const routes: Routes = [
  {
    path: '',
    redirectTo: '/vendergas/login',
    pathMatch: 'full'
  },
  {
    path: 'vendergas/login',
    component: LoginComponent
  },
  {
    path: 'vendergas/sing-up',
    component: SignUpComponent
  },
  {
    path: 'vendergas/create-company',
    component: CreateCompanyComponent
  },
  {
    path: 'vendergas/list-company',
    component: ListCompanyComponent
  },
  {
    path: 'vendergas/edit-company',
    component: EditCompanyComponent
  },
  {
    path: 'vendergas/create-client',
    component: CreateClientComponent
  },
  {
    path: 'vendergas/list-client',
    component: ListClientComponent
  },
  {
    path: 'vendergas/edit-client',
    component: EditClientComponent
  },
  {
    path: 'vendergas/create-product',
    component: CreateProductComponent
  },
  {
    path: 'vendergas/list-product',
    component: ListProductComponent
  },
  {
    path: 'vendergas/edit-product',
    component: EditProductComponent
  },
  {
    path: 'vendergas/create-order',
    component: CreateOrderComponent
  },
  {
    path: 'vendergas/list-order',
    component: ListOrderComponent
  },
  {
    path: 'vendergas/edit-order',
    component: EditOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
