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
import { ReglementService } from '../services/reglement.service';

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

  Factures: FactureModel[];
  countries$: Observable<FactureModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  Commandes: {id:number, text:string}[] = [];
  Reglements: {id:number, text:string}[] = [];// definir les champs visible du select
  options = {
    width: '220',
    multiple: true,
    tags: true
  };
  
  constructor(
    pipe: DecimalPipe,
    private factureService: FacturesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private commandeService: CommandeService,
    private reglementService : ReglementService
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
        for (var i = 0; i< commandes.length; i ++ )
        {
          this.Commandes.push({id: commandes[i]['id'], text: commandes[i]['refCommande'] });
        }
        // this.Commandes = commandes;
        console.log(this.Commandes);
      });

      this.reglementService.getReglements().subscribe(
        reglements => {
          for (var i = 0; i< reglements.length ; i ++ )
          {
            this.Reglements.push({id: reglements[i]['id'], text: reglements[i]['refReglement'] });
          }
          // this.Commandes = commandes;
          console.log(this.Reglements);
        });


  }

  
  openLg(content) {
    //console.log(this.Factures);
    this.modalService.open(content, { size: 'lg' });
  }

  createCommade() {
    //this.commandes.push(this.Commandes.refCommande)
  }
  Submitf(){
    console.log(this.formGroup.controls.commandes.value);
}
  createForm() {
    this.formGroup = this.formBuilder.group({
      'refFacture': [null, Validators.required],
      //'dateEmission': [null, Validators.required],
      'datePaiement': [null, Validators.required],
      'montant': [null, Validators.required],
      'commandes': [null, Validators.required],
      'reglements': [null, Validators.required],
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
    Facture.reglements = formFacture.reglements.value;

    return Facture;
  }

}

