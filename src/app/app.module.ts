import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ShinyListComponent } from './shiny-list/shiny-list.component';
import { EditComponent } from './edit/edit.component';
import { RouteGuard } from './route-guard';
import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ShinyListComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
