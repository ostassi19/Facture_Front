import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CommandeModel } from '../models/commande.model';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  Commandes: CommonModule;
  countries$: Observable<CommandeModel[]>;
  filter = new FormControl('');
  formGroup: FormGroup;
  constructor(
    private commandeService: CommandeService,
    pipe: DecimalPipe,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  )
  {
    this.commandeService.getCommandes().subscribe(
      commandes => {
        this.Commandes = commandes;
        //console.log(this.Factures);
      });
    console.log(this.Commandes);
  }


  ngOnInit(): void {
    this.createForm();
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'refCommande': [null, Validators.required],
      'date': [null, Validators.required],
      'montant': [null, Validators.required],
      'validate': ''
    });
  }
}

