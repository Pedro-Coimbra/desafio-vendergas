import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignUpComponent, CreateCompanyComponent } from './vendergas';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
