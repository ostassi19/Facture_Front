import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactureModel} from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  private Base_Url = 'http://localhost:8008/facture/list';
  private Base_Url1= 'http://localhost:8008/facture/add';
  private Base_Url2= 'http://localhost:8008/facture/'

  constructor(private http: HttpClient) { }

  getFactures(): Observable<FactureModel[]> {
    return this.http.get<FactureModel[]>(this.Base_Url);
  }

  setFacture(data): Observable<FactureModel[]> {
    return this.http.post<FactureModel[]>(this.Base_Url1,data);
  }
  getFacturesByPersonnel(id: number): Observable<FactureModel[]> {
    return this.http.get<FactureModel[]>(`${this.Base_Url2}/${id}/personne`);
  }
}
