import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddproductsComponent } from './Products/addproducts/addproducts.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { ViewcartComponent } from './viewcart/viewcart.component';

const routes: Routes = [
            {path: '', component: ListproductsComponent},
            {path: 'login', component: LoginComponent},
            {path: 'viewcart', component: ViewcartComponent, canActivate: [AuthGuard]},
            {path: 'addproducts', component: AddproductsComponent, canActivate: [AuthGuard] },
            {path: 'category', redirectTo: '/', pathMatch: 'full'},
            {path: 'category/:catid', component: ListproductsComponent},
            {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
