import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FacturesService } from '../services/factures.service';
import { FactureModel } from '../models/facture.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeModel } from '../models/commande.model';
import { CommandeService } from '../services/commande.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';


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
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  Factures: FactureModel;
  countries$: Observable<FactureModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  Commandes: CommandeModel[];

  constructor(
    pipe: DecimalPipe,
    private factureService: FacturesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private commandeService: CommandeService,
  ) {
    this.factureService.getFactures().subscribe(
      factures => {
        this.Factures = factures;
        //console.log(this.Factures);
      });
    console.log(this.Factures);
   
  }
  ngOnInit(): void {
    this.createForm();
    this.createCommade();
  }
  openLg(content) {
    this.commandeService.getCommandes().subscribe(
      commandes => {
        this.Commandes = commandes;
        //console.log(this.Factures);
      });
    console.log(this.Factures);
    this.modalService.open(content, { size: 'lg' });
  }

  createCommade() {
    //this.commandes.push(this.Commandes.refCommande)
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refFacture': [null, Validators.required],
      'dateEmission': [null, Validators.required],
      'datePaiement': [null, Validators.required],
      'montant': [null, Validators.required],
      'commandes': [null, Validators.required],
      'validate': ''
    });
  }


  Submit() {
    const Facture = this.preparedFacture();
    this.factureService.setFacture(Facture).subscribe();
  }

  preparedFacture() {
    const formFacture = this.formGroup.controls;
    const Facture = new FactureModel;

    Facture.refFacture = formFacture.refFacture.value;
    Facture.dateFacture = formFacture.dateFacture.value;
    Facture.commandes = formFacture.commandes.value;

    return Facture;
  }

}

