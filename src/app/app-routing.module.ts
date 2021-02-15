import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './route-guard';
import { ShinyListComponent } from './shiny-list/shiny-list.component';

const routes: Routes = [
  { path: '', component: ShinyListComponent, canActivate: [RouteGuard] },
  { path: 'edit', component: EditComponent, canActivate: [RouteGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
