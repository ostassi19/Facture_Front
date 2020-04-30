import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CommandeModel } from '../models/commande.model';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {


  Commandes: CommonModule;
  countries$: Observable<CommandeModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  constructor(
    private commandeService: CommandeService,
    pipe: DecimalPipe,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {

  }


  ngOnInit(): void {
    this.getAlCommandes();
    this.createForm();
  }
  // fonction permet d'apporter tous les données de l'entite Commande.
  getAlCommandes(){
    this.commandeService.getCommandes().subscribe(
      commandes => {
        this.Commandes = commandes;
        //console.log(this.Commandes);
      });
    console.log(this.Commandes);
  }

  Submit(){
    const Commande = this.preparedCommande();
    this.commandeService.setCommande(Commande).subscribe();
  }
  
  openLg(content) {//foction permettant d'ouvrir la modal ajouter
    this.modalService.open(content, { size: 'lg' });
  }


  createForm() {// fonction permettant d'apporter tous les attributs de l'entité commande
    this.formGroup = this.formBuilder.group({
      'refCommande': ['C000', Validators.required],
      //'date': [null, Validators.required],
     // 'montant': [null, Validators.required],
      'prixUnitaire': [null, Validators.required],
      'reduction': [null, Validators.required],
      'refProduit': [null, Validators.required],
      'designationProduit': [null, Validators.required],
      'tva': [null, Validators.required],
      'quantité': [null, Validators.required],
      'validate': ''
    });
  }
  preparedCommande(){
    const formCommande = this.formGroup.controls; 
    const Commande  = new CommandeModel();
    Commande.refCommande = formCommande.refCommande.value;
    Commande.refProduit = formCommande.refProduit.value;
    Commande.reduction = formCommande.reduction.value;
    Commande.quantité = formCommande.quantité.value;
    Commande.designationProduit = formCommande.designationProduit.value;
    Commande.tva = formCommande.tva.value;
    Commande.prixUnitaire = formCommande.prixUnitaire.value;
    Commande.montant = 19;

    return Commande;
  }
}


