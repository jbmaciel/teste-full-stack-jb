import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntidadesListComponent } from './entidades-list/entidades-list.component';
import { EntidadesFormComponent } from '../../components/entidades/entidades-form/entidades-form.component';

const routes = [
  {path: '', component: EntidadesListComponent},
  {path: 'criar', component: EntidadesFormComponent },
  {path: ':id', component: EntidadesFormComponent},
  {path: ':id/editar', component: EntidadesFormComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EntidadesModule { }
