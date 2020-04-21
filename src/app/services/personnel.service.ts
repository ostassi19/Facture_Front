import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonelModel } from '../models/personnel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(
    private http: HttpClient
  ) { }

  private Base_Url = 'http://localhost:8008/personnel/all';
  private Base_Url1 = 'http://localhost:8008/personnel/{id}';

  getPersonnels(): Observable<PersonelModel[]> {//fonction permettant d'apporter tous les donnés du serveur.
    return this.http.get<PersonelModel[]>(this.Base_Url);
  }
  
  getPersonnel(): Observable<PersonelModel[]> {//fonction permettant d'apporter tous les donnés du serveur.
    return this.http.get<PersonelModel[]>(this.Base_Url1);
  }
}
