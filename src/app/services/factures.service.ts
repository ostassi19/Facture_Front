import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactureModel} from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  private Base_Url = 'http://localhost:8008/facture/list';

  constructor(private http: HttpClient) { }

  getFactures(): Observable<FactureModel[]> {
    return this.http.get<FactureModel[]>(this.Base_Url);
  }
}
