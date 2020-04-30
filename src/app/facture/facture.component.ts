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
  providers: [DatePipe]
})
export class FactureComponent implements OnInit {

  public id;
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
    private personnelService: PersonnelService,
    private datePipe: DatePipe
  ) {

  }
  ngOnInit(): void {
    this.createForm();
    this.getFacture();
    this.createCommade();
    this.getCommandes(null);
    this.getPersonnel(null);
  }
  getFacture() {
    this.factureService.getFactures().subscribe(//apporter tous les factures de la base
      factures => {
        this.Factures = factures;
        //console.log(this.Factures);
      });
    console.log(this.Factures);
  }
  getCommandes(commandes) {
    if (commandes) {
      this.Commandes = [];
      for (var i = 0; i < commandes.length; i++) {
        this.Commandes.push({ id: commandes[i]['id'], text: commandes[i]['refCommande'] });
      }
    } else {
      this.commandeService.getCommandes().subscribe(//apporter tous les commandes de la base
        commandes => {
          for (var i = 0; i < commandes.length; i++) {
            this.Commandes.push({ id: commandes[i]['id'], text: commandes[i]['refCommande'] });
          }
          // this.Commandes = commandes;
          console.log(this.Commandes);
        });
    }
  }
  getPersonnel(personnels) {
    if (personnels) {
      this.Personnels = [];
      for (var i = 0; i < personnels.length; i++) {
        this.Personnels.push({ id: personnels[i]['id'], text: personnels[i]['cin'] });
      }
    } else {
      this.personnelService.getPersonnels().subscribe(
        personnels => {
          for (var i = 0; i < personnels.length; i++) {
            this.Personnels.push({ id: personnels[i]['id'], text: personnels[i]['cin'] });
          }
          // this.Commandes = commandes;
          console.log(this.Personnels);
        });
    }
  }
  openLg(_facture) {
    this.id = null;
    this.createForm();
    //console.log(this.Factures);
    this.modalService.open(_facture, { size: 'lg' });
  }

  createCommade() {
    //this.commandes.push(this.Commandes.refCommande)
  }
  Submitf() {
    console.log(this.formGroup.controls.commandes.value);
  }
  createForm() {
    this.id = null;
    this.formGroup = this.formBuilder.group({
      'refFacture': [null, Validators.required],
      'dateFacture': [null, Validators.required],
      //'montant': [null, Validators.required],
      'commandes': [null, Validators.required],
      'personnels': [null, Validators.required],
      //'nbrelancement': [null, Validators.required],

      'validate': ''
    });
  }
  //content??
  editFacture(id: number, ref, date, commandes, per, _facture) {
    this.id = id; //savoir que c'est une modification et pas un ajout // pour assurer la modification non l'ajout
    const com = [];
    //recupérer tous les id commandes selectionnés dans un tableau com
    //pour afficher les commandes existe dans la facture
    for (var i = 0; i < commandes.length; i++) {
      var c = commandes[i]['id'];
      com.push(c.toString());
    }
    //retour ["x","y"]
    //
    const pers = [];
    if (per) {
      var p = per['id'];
      pers.push(p.toString());
      //console.log(pers);
    }

    this.formGroup = this.formBuilder.group({
      'refFacture': [ref, Validators.required],
      //'dateEmission': [null, Validators.required],
      'dateFacture': [date, Validators.required],
      //'montant': [null, Validators.required],
      'commandes': [com, Validators.required],
      'personnels': [pers ? pers : null, Validators.required],//??
     // 'montant_relance': [montantR, Validators.required],
      'validate': ''
    });
    this.modalService.open(_facture, { size: 'lg' });
    //console.log('eeee');
  }
  deleteFacture(id: number) {
    this.factureService.deleteFacture(id).subscribe(
      facture => {
        this.getFacture();
      }
    );
    console.log('eeee');
  }
  Submit(id) {
    //console.log(id);
    if (id != null) {
      this.factureService.putFacture(id, this.preparedFacture()).subscribe(
        facture => {
          this.getFacture();
        }
      );
    } else {
      const Facture = this.preparedFacture();
      this.factureService.setFacture(Facture).subscribe(
        facture => {
          this.getFacture();
        }
      );
    }
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
    var p = formFacture.personnels.value;//[1] //{id: 1}
    Facture.personnels = { id: p[0] };
   // Facture.montant_relance = formFacture.montant_relance.value;

    return Facture;
  }

  relacerClient(id){
    this.id= id;
    const formFacture = this.formGroup.controls;
    const Facture = new FactureModel;
    Facture.nbrelancement = formFacture.nbrelancement.value + 1;
    // const n= nb + 1
    // this.formGroup = this.formBuilder.group({
    //   'refacture': [n, Validators.required],
    //   'validate': ''});

    return Facture

  }

  dateNow = new Date();
  formdate =  this.datePipe.transform(this.dateNow, 'yyyy-MM-dd');

  nbRelancement(id){
    this.factureService.putFacture(id,{nbrelancement: 1}).subscribe(
      facture => {
        this.getFacture();
        console.log('ok');
      });
  }

}

