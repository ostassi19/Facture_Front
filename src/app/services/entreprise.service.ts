import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntrepriseModel } from '../models/entreprise.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(
    private http: HttpClient
  ) {}

  private Base_Url = 'http://localhost:8008/entreprise/all';

  getEntreprises(): Observable<EntrepriseModel[]> {//fonction permettant d'apporter tous les donnés du serveur.
    return this.http.get<EntrepriseModel[]>(this.Base_Url);
  }
}
