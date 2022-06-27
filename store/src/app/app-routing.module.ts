import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CatalogComponent } from './catalog/catalog/catalog.component';
import { CartComponent } from './cart/cart/cart.component';
import { OrderComponent } from './order/order/order.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
