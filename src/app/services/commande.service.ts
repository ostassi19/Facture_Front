import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { CommandeModel } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(
    private http: HttpClient
  ) { }
  private Base_Url = 'http://localhost:8008/commande/all';
  private Base_Url1 = 'http://localhost:8008/commande/add';

  getCommandes(): Observable<CommandeModel[]> {//fonction permettant d'apporter tous les donnés du serveur.
    return this.http.get<CommandeModel[]>(this.Base_Url);
  }

  setCommande(data): Observable<CommandeModel[]> {
    return this.http.post<CommandeModel[]>(this.Base_Url1,data);
  }
}
