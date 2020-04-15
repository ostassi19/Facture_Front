import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../services/commande.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  Commandes: CommonModule;
  constructor(
    private commandeService: CommandeService
  ) {

  }

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe(
      commandes =>{
        this.Commandes = commandes;
      }
    )
  }

}
