import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FactureComponent } from './facture/facture.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommandeComponent } from './commande/commande.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReglementComponent } from './reglement/reglement.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { NgSelect2Module } from 'ng-select2';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';

// import {MaterialModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FactureComponent,
    CommandeComponent,
    ReglementComponent,

    AnalyseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelect2Module,
    MatDatepickerModule,
    MatNativeDateModule, 

    // MaterialModule,            // <----- this module will be deprecated in the future version.
    // // MatDatepickerModule,        // <----- import(must)
    // // MatNativeDateModule,        // <----- import for date formating(optional)
    // // MatMomentDateModule   

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
