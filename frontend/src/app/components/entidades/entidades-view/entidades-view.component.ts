import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadesService } from '../../../modules/entidades/entidades.service';
import { CommonModule } from '@angular/common';
import { CnpjPipe } from '../../../shared/cnpj.pipe';


@Component({
  selector: 'app-entidades-view',
  standalone: true,
  imports: [CommonModule, CnpjPipe],
  templateUrl: './entidades-view.component.html',
  styleUrl: './entidades-view.component.css'
})
export class EntidadesViewComponent {
  entidade: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entidadeService: EntidadesService
  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entidadeService.getEntidadeById(parseInt(id)).subscribe((res) => {
        this.entidade = res;
      });
    }
  }

  voltar() {
    this.router.navigate(['/entidades']);
  }

  editar() {
    this.router.navigate([`/entidades/${this.entidade.id}/editar`]);
  }

}
