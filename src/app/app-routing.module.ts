import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FactureComponent} from './facture/facture.component';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {DecimalPipe} from '@angular/common';
import {CommandeComponent} from './commande/commande.component';
import { ReglementComponent } from './reglement/reglement.component';
import { AnalyseComponent } from './analyse/analyse.component';


const routes: Routes = [
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'factures',
    component: FactureComponent
  },
  {
    path: 'commandes',
    component: CommandeComponent

  },
  {
    path: 'reglements',
    component: ReglementComponent

  },

  {
    path: 'analyses',
    component: AnalyseComponent

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DecimalPipe],
})
export class AppRoutingModule { }
