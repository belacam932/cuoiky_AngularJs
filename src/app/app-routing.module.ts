import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title:'Home'},
  {path:'list',component:ListComponent,title:'Product-List'},
  {path:'product-details/:id',component: DetailsComponent, title:'Product Details'},
  {path:'login',component:LoginComponent,title:'login'},
  {path:'register',component:RegisterComponent,title:'register'},
  {path:'cart',component:CartComponent,title:'mycart'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
