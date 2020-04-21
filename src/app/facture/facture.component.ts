import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FacturesService } from '../services/factures.service';
import { FactureModel } from '../models/facture.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeModel } from '../models/commande.model';
import { CommandeService } from '../services/commande.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { PersonnelService } from '../services/personnel.service';

/*const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];
*/


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
})
export class FactureComponent implements OnInit {

  Factures: FactureModel[];
  countries$: Observable<FactureModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  Commandes: { id: number, text: string }[] = [];
  Personnels: { id: number, text: string }[] = [];// definir les champs visible du select
  // à changer avec Personnels 
  options = {
    width: '220',
    multiple: true,
    tags: true
  };

  op = {
    width: '220',
    multiple: false,
    tags: true
  };

  constructor(
    pipe: DecimalPipe,
    private factureService: FacturesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private commandeService: CommandeService,
    private personnelService: PersonnelService
  ) {
    this.factureService.getFactures().subscribe(//apporter tous les factures de la base
      factures => {
        this.Factures = factures;
        //console.log(this.Factures);
      });
    console.log(this.Factures);

  }
  ngOnInit(): void {
    this.createForm();
    this.createCommade();
    this.commandeService.getCommandes().subscribe(//apporter tous les commandes de la base
      commandes => {
        for (var i = 0; i < commandes.length; i++) {
          this.Commandes.push({ id: commandes[i]['id'], text: commandes[i]['refCommande'] });
        }
        // this.Commandes = commandes;
        console.log(this.Commandes);
      });

    this.personnelService.getPersonnels().subscribe(
      personnels => {
        for (var i = 0; i < personnels.length; i++) {
          this.Personnels.push({ id: personnels[i]['id'], text: personnels[i]['cin'] });
        }
        // this.Commandes = commandes;
        console.log(this.Personnels);
      });


  }


  openLg(content) {
    //console.log(this.Factures);
    this.modalService.open(content, { size: 'lg' });
  }

  createCommade() {
    //this.commandes.push(this.Commandes.refCommande)
  }
  Submitf() {
    console.log(this.formGroup.controls.commandes.value);
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'refFacture': [null, Validators.required],
      //'dateEmission': [null, Validators.required],
      'dateFacture': [null, Validators.required],
      //'montant': [null, Validators.required],
      'commandes': [null, Validators.required],
      'personnels': [null, Validators.required],
      'montant_relance': [null, Validators.required],
      'validate': ''
    });
  }


  Submit() {
    const Facture = this.preparedFacture();
    this.factureService.setFacture(Facture).subscribe();
  }

  preparedFacture() {
    const formFacture = this.formGroup.controls;
    const array_commande: { id: number }[] = [];  // tableau vide de type json { "id": ! }
    const Com = formFacture.commandes.value; // tableau facture choisir 
    for (var i = 0; i < Com.length; i++) { // parcoure de tableau Fact
      array_commande.push({ id: Com[i] }); // remplisage de tableau array_facture return [{"id": 1}]
    }

    const Facture = new FactureModel;
    Facture.refFacture = formFacture.refFacture.value;
    Facture.dateFacture = formFacture.dateFacture.value;
    Facture.commandes = array_commande;
    Facture.personnels = { id: formFacture.personnels.value };
    Facture.montant_relance = formFacture.montant_relance.value;

    return Facture;
  }

}

