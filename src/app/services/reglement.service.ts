import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReglementModel } from '../models/reglement.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {

  private  Base_Url = 'http://localhost:8008/reglement/list';
  private Base_Url1 = 'http://localhost:8008/reglement/add';
  private Base_Url2 = 'http://localhost:8008/reglement/';

  constructor(private http: HttpClient) { }

  getReglements() : Observable<ReglementModel[]> {
    return this.http.get<ReglementModel[]>(this.Base_Url);
  }

  setReglement(data): Observable<ReglementModel[]> {
    return this.http.post<ReglementModel[]>(this.Base_Url1,data);
  }
  putReglement(id: number, data): Observable<ReglementModel[]> {
    return this.http.put<ReglementModel[]>(`${this.Base_Url2}${id}/edit`,data);
  }
  deleteReglement(id: number): Observable<ReglementModel[]> {
    return this.http.delete<ReglementModel[]>(`${this.Base_Url2}${id}/delete`);
  }
}
