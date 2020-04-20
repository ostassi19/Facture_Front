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
  options = {
    width: '220',
    multiple: true,
    tags: true
  };

  constructor(

    pipe: DecimalPipe,
    private reglementService: ReglementService,
    private modalService: NgbModal,
    private factureService: FacturesService,
    private formBuilder: FormBuilder
  ) {
    this.reglementService.getReglements().subscribe(
      reglements => {
        this.Reglements = reglements;

      });
    console.log(this.Reglements);
  }

  ngOnInit(): void {
    this.createForm();
    this.factureService.getFactures().subscribe(//apporter tous les commandes de la base
      factures => {
        for (var i = 0; i < factures.length; i++) {
          this.Factures.push({ id: factures[i]['id'], text: factures[i]['refFacture'] });
        }


      });

  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
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
