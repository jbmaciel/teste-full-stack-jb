import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadesService } from '../../../modules/entidades/entidades.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { DropdownComponent } from '../../ui/dropdow/dropdown.component';

@Component({
  selector: 'app-entidades-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, DropdownComponent],
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
    console.log('Especialidades selecionadas:', selectedIds);
  }

  obterEntidade(id: number) {
    this.entidadesService.getEntidadeById(id).subscribe(response => {
      this.entidadeForm.patchValue(response);
      this.entidadeForm.patchValue({
        data_inauguracao: response.data_inauguracao ? response.data_inauguracao.split(' ')[0] : null,
      });
      this.loading = false; //Libera a tela para interações
    });
  }

  salvar() {
    this.submitted = true;

    if (this.entidadeForm.invalid) {
      console.log('Formulário inválido:', this.entidadeForm.errors);
      return; // Se for inválido, interrompe a submissão
    }

    if (this.isEditMode) {
      const entidade_id = this.route.snapshot.paramMap.get('id');
      this.entidadesService.updateEntidade(this.entidadeForm.value, entidade_id).subscribe(() => {
        alert('Entidade atualizada com sucesso!');
        this.router.navigate(['/entidades']);
      });

    } else {
      this.entidadesService.createEntidade(this.entidadeForm.value).subscribe(() => {
        console.log(this.entidadeForm.value);
        alert('Entidade criada com sucesso!');
        console.log(this.entidadeForm.value);
        this.router.navigate(['/entidades']);
      });
    }
  }

  cancelar() {
    return this.router.navigate(['/entidades'])
  }
}
