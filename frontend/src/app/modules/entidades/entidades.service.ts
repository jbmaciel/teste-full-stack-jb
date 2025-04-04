import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginacao } from '../../interfaces/paginacao.interface';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {
  private apiUrl = 'http://localhost:8000/api/entidades';
  private apiUrlBase = 'http://localhost:8000/api';

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

  getEntidadeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEntidade(entidade:any): Observable<any> {
    console.log(entidade);
    return this.http.post(this.apiUrl, entidade);
  }

  updateEntidade(entidade: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, entidade);
  }

  deleteEntidade(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getRegionais(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlBase}/regionais`);
  }

  getEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlBase}/especialidades`);
  }
}
