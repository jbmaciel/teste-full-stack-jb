import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadesService } from '../../../modules/entidades/entidades.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { DropdownComponent } from '../../ui/dropdow/dropdown.component';
import { ModalComponent } from '../../ui/modal/modal.component';

@Component({
  selector: 'app-entidades-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, DropdownComponent, ModalComponent],
  templateUrl: './entidades-form.component.html',
  styleUrl: './entidades-form.component.css'
})
export class EntidadesFormComponent implements OnInit {
  entidadeForm!: FormGroup
  regionais: any[] = []; // Lista de regionais
  especialidades: any[] = []; // Lista de especialidades
  isEditMode = false;
  loading = true;
  submitted = false;
  entidade_id = this.route.snapshot.paramMap.get('id');
  mensagemSucesso = false;
  mostrarErro = false;
  erroTitulo = 'Erro ao salvar';
  erroMensagem = '';
  erroStatus = '';



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entidadesService: EntidadesService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();

    // Verificando se há um ID na URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.obterEntidade(+id);
    } else {
      this.loading = false; // Habilitando tela para interações
    }
  }

  inicializarForm() {
    this.entidadeForm = this.fb.group({
      nome_fantasia: ['', [Validators.required, Validators.maxLength(255)]],
      razao_social: ['', [Validators.required, Validators.maxLength(255)]],
      cnpj: ['', [Validators.required, Validators.maxLength(18)]], // Validador customizado
      regional: ['', [Validators.required]],
      data_inauguracao: ['', [Validators.required]],
      ativa: [true],
      especialidades_medicas: [[], [Validators.required, Validators.minLength(5)]]
    });

    // Carregar regionais separadamente do endpoint principal
    this.carregarRegionais();
    this.carregarEspecialidades();
  }

  carregarRegionais() {
    this.entidadesService.getRegionais().subscribe({
      next: (data) => (this.regionais = data),
      error: (err) => console.error('Erro ao carregar regionais', err),
    });
  }

  carregarEspecialidades() {
    this.entidadesService.getEspecialidades().subscribe({
      next: (data) => (this.especialidades = data),
      error: (err) => console.error('Erro ao carregar especialidades', err),
    });
  }

  get especialidadesInvalidas() {
    return this.entidadeForm.get('especialidades_medicas')?.value.length < 5;
  }

  onSelectionChange(selectedIds: number[]) {
    this.entidadeForm.get('especialidades_medicas')?.setValue(selectedIds);
  }

  obterEntidade(id: number) {
    this.entidadesService.getEntidadeById(id).subscribe(response => {
      this.entidadeForm.patchValue(response);
      this.entidadeForm.patchValue({
        data_inauguracao: response.data_inauguracao ? response.data_inauguracao.split(' ')[0] : null,
        regional: response.regional.id,
        especialidades_medicas: response.medical_specialties.map((e: any) => e.id),
      });
      this.loading = false; //Libera a tela para interações
    });
  }

  salvar() {
    this.submitted = true;
    if (this.entidadeForm.invalid) {
      return; // Se for inválido, interrompe a submissão
    }

    if (this.isEditMode) {
      const entidade_id = this.route.snapshot.paramMap.get('id');
      this.entidadesService.updateEntidade(this.entidadeForm.value, entidade_id).subscribe({
        next: (response) => {
          if (response.id) {
            console.log("Retorno:", response);
            this.mensagemSucesso = true;
            setTimeout(() => {
              this.router.navigate(['/entidades', response.id]);
            }, 1000);
          }
          console.log("Salvando:", response);
        },
        error: (error) => {
          this.mostrarErro = true;
          this.erroStatus = error.status;
          if (error.status === 422 && typeof error.error === 'object') {
            const mensagens = Object.values(error.error)
              .flat()
              .join('\n'); // ou use '<br>' se quiser HTML

            this.erroMensagem = mensagens;
          } else {
            this.erroMensagem = 'Erro inesperado: ' + error.message;
          }
          console.error('Erro ao criar entidade:', error);
        }
      })
    } else {
      this.entidadesService.createEntidade(this.entidadeForm.value).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.mensagemSucesso = true;
            setTimeout(() => {
              this.router.navigate(['/entidades', response.id]);
            }, 1000);
          }
        },
        error: (error) => {
          console.error('Erro ao criar entidade:', error);
          this.mostrarErro = true;
          this.erroStatus = error.status;
          if (error.status === 422 && typeof error.error === 'object') {
            const mensagens = Object.values(error.error)
              .flat()
              .join('\n'); // ou use '<br>' se quiser HTML

            this.erroMensagem = mensagens;
          } else {
            this.erroMensagem = 'Erro inesperado: ' + error.message;
          }
          console.error('Erro ao criar entidade:', error);
        }
      });
    }
  }

  excluir(id: any) {
    if (confirm('Tem certeza que deseja excluir esta entidade?')) {
      this.entidadesService.deleteEntidade(this.entidade_id).subscribe({
        next: () => {
          alert('Entidade excluída com sucesso!');
          this.router.navigate(['/entidades']); // Redireciona após a exclusão
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          alert('Erro ao excluir a entidade.');
        },
      });
    }
  }

  cancelar() {
    return this.router.navigate(['/entidades'])
  }
}
