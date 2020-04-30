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

  public id;
  Reglements: ReglementModel[];
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

  }

  ngOnInit(): void {
    this.createForm();
    this.getReglement();
    this.personnelService.getPersonnels().subscribe(
      personnels => {
        for (var i = 0; i < personnels.length; i++) {
          this.Personnels.push({ id: personnels[i]['id'], text: personnels[i]['cin'] });
        }
        this.Personnels = this.Personnels;

        console.log(this.Personnels);
      });
  }

  getReglement() {
    this.reglementService.getReglements().subscribe(
      reglements => {
        this.Reglements = reglements;

      });
    console.log(this.Reglements);
  }
  openLg(_reglement) {
    this.id = null;
    this.createForm();
    this.modalService.open(_reglement, { size: 'lg' });
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
          if (factures[i]['payed'] == false)
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
      'personnels': [null],
      'validate': ''
    });
  }
  deleteReglement(id: number) {
    this.reglementService.deleteReglement(id).subscribe(
      reglement => {
        this.getReglement();
      }
    );

  }

  editReglement(id: number, ref, date, dela, mont,factures,perso, etat, _reglement) {
    this.id = id; //savoir que c'est une modification et pas un ajout // pour assurer la modification non l'ajout
    const com = [];
    // recupérer tous les id facture selectionnés dans un tableau com
    // pour afficher les commandes existe dans la facture
    for (var i = 0; i < factures.length; i++) {
      var c = factures[i]['id'];
      com.push(c.toString());
    }
    //retour ["x","y"]
    //
    const pers = [];
    if (perso) {
      var p = perso['id'];
      pers.push(p.toString());
      //console.log(pers);
    }

  this.formGroup = this.formBuilder.group({
    'refReglement': [ref, Validators.required],
    'date': [date, Validators.required],
    'delai': [dela, Validators.required],
    //'montant': [null, Validators.required],
    'monatant':  [mont, Validators.required],
    'factures': [com, Validators.required],
   'personnels': [pers ? pers : null, Validators.required],//??
    'modePaiement':[etat, Validators.required],
    'validate': ''
  });
  this.modalService.open(_reglement, { size: 'lg' });
  console.log('eeee');
}

Submit(id) {
  if (id != null) {
    console.log("je suis l'identifiant hhhhh ",id)
    this.reglementService.putReglement(id, this.preparedReglement()).subscribe(
      reglement => {
        this.getReglement();
      }
    );
  } else {
    const Reglement = this.preparedReglement();
    this.reglementService.setReglement(Reglement).subscribe(
      reglement => {
        this.getReglement();
      }
    );
  }

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
  var p = formReglement.personnels.value;//[1] //{id: 1}
    Reglement.personnels = { id: p[0] };
  //Reglement.etat = false;
  Reglement.monatant = formReglement.monatant.value;


  return Reglement;
}

etatReg(id){
  this.reglementService.putReglement(id,{etat: true}).subscribe(
    reglement => {
      this.getReglement();
      console.log('ok', reglement);
    });
}

}
