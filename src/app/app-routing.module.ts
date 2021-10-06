import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignUpComponent, CreateCompanyComponent, ListCompanyComponent, EditCompanyComponent } from './vendergas';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
