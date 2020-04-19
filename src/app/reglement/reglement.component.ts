import { Component, OnInit } from '@angular/core';
import { ReglementModel } from '../models/reglement.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReglementService } from '../services/reglement.service';
import { CommonModule } from '@angular/common';

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

  constructor(

    pipe: DecimalPipe,
    private reglementService: ReglementService,
    private modalService: NgbModal,
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
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refReglement': [null, Validators.required],
      'monatant': [null, Validators.required],
      'delai': [null, Validators.required],
      'etat': [null, Validators.required],
      'type': [null, Validators.required],
      //'date': [null, Validators.required],
      'validate': ''
    });
  }
  Submit() {
    const Reglement = this.preparedReglement();
    this.reglementService.setReglement(Reglement).subscribe();
  }

  preparedReglement() {
    const formReglement = this.formGroup.controls;
    const Reglement = new ReglementModel;

    Reglement.refReglement = formReglement.refReglement.value;
    Reglement.delai = formReglement.delai.value;
    Reglement.etat = false;
    Reglement.monatant = formReglement.monatant.value;


    return Reglement;
  }

}
