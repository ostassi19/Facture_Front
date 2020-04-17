import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import { CommandeModel } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(
    private http: HttpClient
  ) { }
  private Base_Url = 'http://localhost:8008/commande/all';

  getCommandes(): Observable<CommandeModel[]> {
    return this.http.get<CommandeModel[]>(this.Base_Url);
  }
}