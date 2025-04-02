import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginacao } from '../../interfaces/paginacao.interface';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {
  private apiUrl = 'http://localhost:8000/api/entidades';

  constructor(private http: HttpClient) { }

  getEntidades(
    page: number = 1,
    filtro: string = '',
    colunaOrdenacao: string = 'nome_fantasia',
    ordem = 'asc'
  ): Observable<Paginacao> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('filter', filtro)
    .set('sortBy', colunaOrdenacao)
    .set('order', ordem);
    return this.http.get<Paginacao>(this.apiUrl, { params})
  }
}
