import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  {path:'' , redirectTo:'restaurants' , pathMatch:'full'},
  {path:'restaurants' , component:RestaurantsComponent},
  {path:'menu/:id' , component:MenuComponent},
  {path:'register' , component:RegisterComponent , canActivate:[RegisterGuard]},
  {path:'order' , component:OrderComponent , canActivate:[AuthGuard]},
  {path:'login' , component:LoginComponent , canActivate:[RegisterGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
