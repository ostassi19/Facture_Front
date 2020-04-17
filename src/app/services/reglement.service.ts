import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReglementModel } from '../models/reglement.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {

  private  Base_Url = 'http://localhost:8008/reglement/list';
  constructor(private http: HttpClient) { }

  getReglements() : Observable<ReglementModel> {
    return this.http.get<ReglementModel>(this.Base_Url);
  }
}
