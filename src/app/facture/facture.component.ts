import {Component, OnInit, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {FacturesService} from '../services/factures.service';
import {FactureModel} from '../models/facture.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    pipe: DecimalPipe,
    private factureService: FacturesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
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
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refFacture': [null, Validators.required],
      'dateEmission': [null, Validators.required],
      'datePaiement': [null, Validators.required],
      'montant': [null, Validators.required],
      'validate': ''
    });
  }
}
