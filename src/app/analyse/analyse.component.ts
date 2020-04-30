import { Component, OnInit } from '@angular/core';
import { AnalyseModel } from '../models/analyse.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AnalyseService } from '../services/analyse.service';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {

  Analyses: CommonModule;
  countries$: Observable<AnalyseModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;

  constructor(
    private analyseService: AnalyseService,
    pipe: DecimalPipe,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.analyseService.getAnalyses().subscribe(
      analyses => {
        this.Analyses = analyses;
      });
    console.log(this.Analyses);
  }

  ngOnInit(): void {
    this.createForm();
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refAnalyse': [null, Validators.required],
      'datepaiement': [null, Validators.required],
      'nbrelancement': [null, Validators.required],
      'validate': ''
    });
  }

  importer(){

  }



}
