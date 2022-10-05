import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  {path:'' , redirectTo:'restaurants' , pathMatch:'full'},
  {path:'restaurants' , component:RestaurantsComponent},
  {path:'menu/:id' , component:MenuComponent},
  {path:'register' , component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
