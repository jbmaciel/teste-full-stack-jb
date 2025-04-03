import { Component, OnInit } from '@angular/core';
import { EntidadesService } from '../entidades.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Paginacao } from '../../../interfaces/paginacao.interface';

@Component({
  selector: 'app-entidades-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entidades-list.component.html',
  styleUrls: ['./entidades-list.component.css']
})

export class EntidadesListComponent implements OnInit {
  entidades: any[] = [];
  filtro: string = '';
  filtroSubject = new Subject<string>();
  ultimaBusca = new BehaviorSubject<string>('');
  sortColumn = 'nome_fantasia';
  sortOrder: 'asc' | 'desc' = 'asc';
  paginacao: Paginacao = { current_page: 1, last_page: 1, data: [] };

  constructor(private entidadesService: EntidadesService, private router: Router) { }

  ngOnInit() {
    this.carregarEntidades();

    // Configurar debounce para busca
    this.filtroSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(filtro => {
        if (this.ultimaBusca.value === filtro) {
          // Se a busca atual for igual a última busca não será feita uma nova requisição
          return of(null);  // Garante que um Observable válido seja retornado
        }
        this.ultimaBusca.next(filtro);
        return this.entidadesService.getEntidades(this.paginacao.current_page, filtro, this.sortColumn, this.sortOrder);
      })
    ).subscribe(response => {
      if (response) {  // Evita sobrescrever os dados com `null`
        this.entidades = response.data; // Obtem a lista completa de entidades
        this.paginacao.last_page = response.last_page; // Atualiza o total de páginas
        this.paginacao.current_page = response.current_page; // Atualiza página atual
      }
    });
  }

  carregarEntidades() {
    this.entidadesService.getEntidades(this.paginacao.current_page, this.filtro, this.sortColumn, this.sortOrder)
      .subscribe(response => {
        this.entidades = response.data ?? [];
        this.paginacao.last_page = response.last_page ?? 1;
        this.paginacao.current_page = response.current_page ?? 1;
      }, error => {
        console.log('Erro ao carregar entidades:', error);
      });


  }

  onFiltroChange(event: any) {
    this.filtroSubject.next(event.target.value);
  }

  limparFiltro() {
    this.filtro = '';
    this.filtroSubject.next('');
  }

  mudarPagina(novaPagina: number) {
    this.paginacao.current_page = novaPagina;
    this.carregarEntidades();
  }

  ordenar(coluna: string) {
    if (this.sortColumn === coluna) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = coluna;
      this.sortOrder = 'asc';
    }
    this.carregarEntidades();
  }

  visualizarEntidade(id: number) {
    this.router.navigate(['/entidades', id]);
  }

  editarEntidade(id: number) {
    this.router.navigate(['/entidades', id, 'editar']);
  }

  criarEntidade() {
    this.router.navigate(['/entidades/criar']);
  }
}
