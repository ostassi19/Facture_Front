import { Component, OnInit } from '@angular/core';
import { ReglementModel } from '../models/reglement.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReglementService } from '../services/reglement.service';
import { CommonModule } from '@angular/common';
import { FactureModel } from '../models/facture.model';
import { FacturesService } from '../services/factures.service';
import { PersonnelService } from '../services/personnel.service';


@Component({
  selector: 'app-reglement',
  templateUrl: './reglement.component.html',
  styleUrls: ['./reglement.component.css']
})
export class ReglementComponent implements OnInit {

  Reglements: CommonModule;
  countries$: Observable<ReglementModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  Factures: { id: number, text: string }[] = [];

  Personnels: { id: number, text: string }[] = [];// definir les champs visible du select

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
    private reglementService: ReglementService,
    private modalService: NgbModal,
    private factureService: FacturesService,
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService

  ) {
    this.reglementService.getReglements().subscribe(
      reglements => {
        this.Reglements = reglements;

      });
    console.log(this.Reglements);
  }

  ngOnInit(): void {
    this.createForm();
    this.personnelService.getPersonnels().subscribe(
      personnels => {
        for (var i = 0; i < personnels.length; i++) {
          this.Personnels.push({ id: personnels[i]['id'], text: personnels[i]['cin'] });
        }
        this.Personnels = this.Personnels;
        // this.Commandes = commandes;
        console.log(this.Personnels);
      });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  onchangeClient(event) {
    // console.log(event);
    const idper = event;//? event : this.formGroup.controls.per.value;
    //if (event)
    //idper = event
    //else idper = this.formGroup.controls.per.value
    console.log(idper);
    this.Factures = null;
    const Factures_: { id: number, text: string }[] = [];
    this.factureService.getFacturesByPersonnel(idper).subscribe(//apporter tous les commandes de la base
      factures => {
        for (var i = 0; i < factures.length; i++) {
          if(factures[i]['payed'] == false)
            Factures_.push({ id: factures[i]['id'], text: factures[i]['refFacture'] });
        }
        this.Factures = Factures_;
      });

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refReglement': [null, Validators.required],
      'monatant': [null],
      'delai': [null, Validators.required],
      //'etat': [null, Validators.required],
      //'type': [false, Validators.required],
      'factures': [null, Validators.required],
      'modePaiement': [null],
      'per': [null],
      'validate': ''
    });
  }
  Submit() {
    const Reglement = this.preparedReglement();
    this.reglementService.setReglement(Reglement).subscribe();
  }
  name = 'Angular 6';
  marked = false;

  toggleVisibility(e) {
    console.log(e.target.checked);
    this.marked = e.target.checked;
  }
  preparedReglement() {
    const formReglement = this.formGroup.controls;
    const array_facture: { id: number }[] = [];  // tableau vide de type json { "id": ! }
    const Fact = formReglement.factures.value; // tableau facture choisir 
    for (var i = 0; i < Fact.length; i++) { // parcoure de tableau Fact
      array_facture.push({ id: Fact[i] }); // remplisage de tableau array_facture return [{"id": 1}]
    }
    const Reglement = new ReglementModel;

    Reglement.refReglement = formReglement.refReglement.value;
    Reglement.delai = formReglement.delai.value;
    Reglement.factures = array_facture;
    //Reglement.etat = false;
    Reglement.monatant = formReglement.monatant.value;


    return Reglement;
  }

}
